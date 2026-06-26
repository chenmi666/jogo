import { readFileSync, writeFileSync, existsSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { spawn } from "child_process"
import { lotterySchedule, bichoSchedule } from "./schedule.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = resolve(__dirname, "..", "public", "data", "resultados.json")

const TELEGRAM_BOT_TOKEN = "8518186011:AAE-TPyqRTb64wXPsXb5tfP1mCQIpIoOSh4"
const TELEGRAM_CHAT_ID = "5774057406"
const BASE_URL = "https://deunoposteagora.com"

// Retry state: slug -> { failedAttempts, lastDrawId }
const retryState = {}

function readExisting() {
  try {
    return JSON.parse(readFileSync(DATA_PATH, "utf-8"))
  } catch {
    return { lotteries: {}, bicho: {} }
  }
}

function nowBrasilia() {
  const now = new Date()
  // Brasília is UTC-3
  const br = new Date(now.getTime() - 3 * 60 * 60 * 1000)
  return {
    hour: br.getUTCHours(),
    minute: br.getUTCMinutes(),
    dow: br.getUTCDay(),
    iso: br.toISOString(),
    timeStr: `${String(br.getUTCHours()).padStart(2, "0")}:${String(br.getUTCMinutes()).padStart(2, "0")}`,
  }
}

function isInWindow(drawTime, scrapeAfterMin) {
  const now = nowBrasilia()
  const [h, m] = drawTime.split(":").map(Number)
  const drawTotal = h * 60 + m
  const nowTotal = now.hour * 60 + now.minute
  const diff = nowTotal - drawTotal

  // Only scrape within the retry window: scrapeAfterMin to (scrapeAfterMin + maxRetries * 3) min after draw
  return diff >= scrapeAfterMin && diff < scrapeAfterMin + 10 * 3 + 5
}

function getLatestLotteryId(data, slug) {
  const results = data.lotteries?.[slug]
  return results?.length > 0 ? results[0].id : null
}

function getLatestBichoId(data, slug, targetTime) {
  const draws = data.bicho?.[slug]
  if (!draws?.length) return null
  // Find a draw whose time starts with the targetTime (e.g., "09:00" matches "9 horas PPT")
  const targetH = parseInt(targetTime.split(":")[0], 10)
  const match = draws.find((d) => {
    const h = parseInt(d.sorteio.match(/\d+/)?.[0], 10)
    return h === targetH
  })
  return match ? `${match.date}-${match.sorteio}` : null
}

function runScraper(slug) {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn("node", ["scripts/scrape.mjs", "--slug", slug], {
      cwd: resolve(__dirname, ".."),
      stdio: ["ignore", "pipe", "pipe"],
    })
    let stdout = "", stderr = ""
    proc.stdout.on("data", (d) => { stdout += d })
    proc.stderr.on("data", (d) => { stderr += d })
    proc.on("close", (code) => {
      if (code === 0) resolvePromise(stdout.trim())
      else reject(new Error(stderr.trim() || `exit code ${code}`))
    })
  })
}

async function sendTelegram(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
    })
  } catch (err) {
    console.error("Telegram send failed:", err.message)
  }
}

async function checkAndScrape() {
  const now = nowBrasilia()
  const existing = readExisting()
  const slugsToRevalidate = []

  // Check lotteries
  for (const entry of lotterySchedule) {
    if (!entry.days.includes(now.dow)) continue

    const idBefore = getLatestLotteryId(existing, entry.slug)
    const inWindow = isInWindow(entry.time, entry.scrapeAfterMin)
    if (!inWindow) continue

    const state = retryState[entry.slug] || { failedAttempts: 0, lastDrawId: null }

    // If data hasn't changed from last check, increment failure
    if (idBefore && idBefore === state.lastDrawId && state.failedAttempts > 0) {
      state.failedAttempts++
    } else if (idBefore && idBefore !== state.lastDrawId) {
      state.failedAttempts = 0
    }

    state.lastDrawId = idBefore

    console.log(`[${now.timeStr}] Checking ${entry.slug} (attempt ${state.failedAttempts + 1}/${entry.maxRetries})`)

    try {
      const output = await runScraper(entry.slug)
      console.log(output)

      const after = readExisting()
      const idAfter = getLatestLotteryId(after, entry.slug)
      const changed = idAfter !== idBefore

      if (changed) {
        console.log(`✅ ${entry.slug} updated: ${idBefore} -> ${idAfter}`)
        state.failedAttempts = 0
        slugsToRevalidate.push(entry.slug)
        const url = `${BASE_URL}/${entry.slug}/`
        await sendTelegram(`✅ ${url} 更新成功`)
      } else {
        state.failedAttempts++
      }
    } catch (err) {
      console.error(`❌ ${entry.slug} scrape failed:`, err.message)
      state.failedAttempts++
    }

    // Telegram alert at max retries
    if (state.failedAttempts >= entry.maxRetries) {
      const url = `${BASE_URL}/${entry.slug}/`
      await sendTelegram(`❌ ${url} 更新失败，多次均为拿到结果`)
      state.failedAttempts = 0 // Reset to avoid repeated alerts
    }

    retryState[entry.slug] = state
  }

  // Check bicho states
  for (const entry of bichoSchedule) {
    const daySchedule = entry.days.find((d) => d.dow === now.dow)
    if (!daySchedule) continue

    for (const drawTime of daySchedule.times) {
      const inWindow = isInWindow(drawTime, entry.scrapeAfterMin)
      if (!inWindow) continue

      const key = `bicho:${entry.slug}:${drawTime}`
      const idBefore = getLatestBichoId(existing, entry.slug, drawTime)
      const state = retryState[key] || { failedAttempts: 0, lastDrawId: null }

      if (idBefore && idBefore === state.lastDrawId && state.failedAttempts > 0) {
        state.failedAttempts++
      } else if (idBefore && idBefore !== state.lastDrawId) {
        state.failedAttempts = 0
      }
      state.lastDrawId = idBefore

      console.log(`[${now.timeStr}] Checking ${entry.slug} @ ${drawTime} (attempt ${state.failedAttempts + 1}/${entry.maxRetries})`)

      try {
        const output = await runScraper(entry.slug)
        console.log(output)

        const after = readExisting()
        const idAfter = getLatestBichoId(after, entry.slug, drawTime)
        const changed = idAfter !== idBefore

        if (changed) {
          console.log(`✅ ${entry.slug} @ ${drawTime} updated`)
          state.failedAttempts = 0
          if (!slugsToRevalidate.includes(entry.slug)) slugsToRevalidate.push(entry.slug)
          const url = `${BASE_URL}/${entry.slug}/`
          await sendTelegram(`✅ ${url} (${drawTime}) 更新成功`)
        } else {
          state.failedAttempts++
        }
      } catch (err) {
        console.error(`❌ ${entry.slug} @ ${drawTime} scrape failed:`, err.message)
        state.failedAttempts++
      }

      if (state.failedAttempts >= entry.maxRetries) {
        const url = `${BASE_URL}/${entry.slug}/`
        await sendTelegram(`❌ ${url} (${drawTime}) 更新失败，多次均为拿到结果`)
        state.failedAttempts = 0
      }

      retryState[key] = state
    }
  }

  // Trigger revalidation for updated slugs
  if (slugsToRevalidate.length > 0) {
    try {
      const port = process.env.PORT || 3000
      const res = await fetch(`http://localhost:${port}/api/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: slugsToRevalidate }),
      })
      const result = await res.json()
      console.log(`Revalidation triggered for: ${slugsToRevalidate.join(", ")}`, result)
    } catch (err) {
      console.error("Revalidation call failed (expected if app not ready):", err.message)
    }
  }
}

// Main loop
const INTERVAL_MS = 60_000 // check every 60 seconds

console.log(`Scheduler started. Checking every ${INTERVAL_MS / 1000}s`)
console.log(`Telegram alerts: ${TELEGRAM_BOT_TOKEN ? "enabled" : "disabled (set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID)"}`)

// Initial check
checkAndScrape()

// Periodic check
setInterval(checkAndScrape, INTERVAL_MS)
