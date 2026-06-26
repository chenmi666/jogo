import * as cheerio from "cheerio"
import { readFileSync, writeFileSync, mkdirSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = "https://deunoposte.app.br"

function parseBrl(str) {
  if (!str) return 0
  const cleaned = str.replace(/^R\$\s*/, "").replace(/\./g, "").replace(",", ".")
  return parseFloat(cleaned) || 0
}

function parsePrizeLine(text) {
  const m = text.match(
    /^(\d+)\s+acertos(?:\s*\+\s*[\d\w\s]+)?\s+([\d.]+)\s+aposta\(s\)\s+R\$\s+([\d.,]+)/
  )
  if (!m) return null
  return {
    hits: parseInt(m[1], 10),
    winners: parseInt(m[2].replace(/\./g, ""), 10),
    value: parseBrl(m[3]),
  }
}

function parseDateInfo(text) {
  const parts = text.trim().split(/\s+/)
  const dayOfWeek = parts.slice(0, -1).join(" ")
  const date = parts[parts.length - 1]
  return { dayOfWeek, date }
}

function parseConcurso(h3Text) {
  const m = h3Text.match(/Concurso\s+(\d+)/)
  return m ? m[1] : ""
}

function parseResultados($, $resultados) {
  const prizes = []
  let winners = ""
  let nextPrize = 0
  let nextDate = ""
  const extras = []

  $resultados.find("p").each((_, el) => {
    const $p = $(el)
    const text = $p.text().trim()
    if (!$p.find("strong").length && text.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      nextDate = text
      return
    }
    const parsed = parsePrizeLine(text)
    if (parsed) { prizes.push(parsed); return }
    if (text.startsWith("Ganhadores")) { winners = text.replace(/^Ganhadores\s*/, "").trim(); return }
    if (text === "Próximo sorteio") return
    if ($p.hasClass("valor")) { nextPrize = parseBrl(text); return }
    extras.push(text)
  })

  let summary = "", notice = ""
  for (const p of extras) {
    if (p.startsWith("O sorteio da") || p.startsWith("A")) {
      if (!summary) summary = p
      else notice = p
    } else if (!notice) { notice = p }
    else { if (!summary) summary = p }
  }

  return { prizes, winners, nextPrize, nextDate, summary, notice }
}

async function fetchPage(path) {
  const url = `${BASE}${path}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`)
  return await res.text()
}

function getText($, el) {
  return $(el).text().trim()
}

// --- Standard lottery: Mega Sena, Lotofácil, Quina, Lotomania ---
function parseStandard($, $card) {
  const $topo = $card.find(".topo-tabela")
  const id = parseConcurso(getText($, $topo.find("h3")))
  const { dayOfWeek, date } = parseDateInfo(getText($, $topo.find("p").first()))
  const numbers = []
  $card.find(".alinha-numeros .numero-individual").each((_, el) => {
    const n = parseInt(getText($, el), 10)
    if (!isNaN(n)) numbers.push(n)
  })
  const res = parseResultados($, $card.find(".resultados"))
  return { id, date, dayOfWeek, numbers, ...res }
}

// --- Loteria Federal ---
function parseFederal($, $card) {
  const $topo = $card.find(".topo-tabela")
  const id = parseConcurso(getText($, $topo.find("h3")))
  const { dayOfWeek, date } = parseDateInfo(getText($, $topo.find("p").first()))
  const numbers = []
  const prizes = []
  $card.find(".federal-individual").each((_, el) => {
    const $el = $(el)
    const numText = $el.find(".numero-direita").clone().children("span").remove().end().text().trim()
    const n = parseInt(numText, 10)
    if (!isNaN(n)) numbers.push(n)
    const valText = $el.find(".numero-direita .numero-individual").text().trim()
    prizes.push({ hits: numbers.length, winners: 1, value: parseBrl(valText) })
  })
  const $res = $card.find(".resultados")
  let nextPrize = 0, nextDate = "", summary = "", notice = ""
  $res.find("p").each((_, el) => {
    const $p = $(el), text = getText($, el)
    if (text === "Próximo sorteio") return
    if ($p.hasClass("valor")) { nextPrize = parseBrl(text); return }
    if (text.match(/^\d{2}\/\d{2}\/\d{4}$/)) { nextDate = text; return }
    if (!summary && text) summary = text
    else if (text) notice = text
  })
  return { id, date, dayOfWeek, numbers, prizes, winners: "", nextPrize, nextDate, summary: summary || undefined, notice: notice || undefined }
}

// --- Dupla Sena (two draws) ---
function parseDuplaSena($, $card) {
  const $topo = $card.find(".topo-tabela")
  const id = parseConcurso(getText($, $topo.find("h3")))
  const { dayOfWeek, date } = parseDateInfo(getText($, $topo.find("p").first()))
  const allNumbers = []
  const firstDraw = { numbers: [], prizes: [], winners: "" }
  const secondDraw = { numbers: [], prizes: [], winners: "", nextPrize: 0, nextDate: "", summary: "", notice: "" }

  const blocks = $card.find(".conteudo-tabela").contents().filter(function () {
    return this.type === "tag" && (this.tagName === "h3" || this.tagName === "div")
  })

  let current = null
  blocks.each((_, el) => {
    const tag = el.tagName.toLowerCase()
    if (tag === "h3") {
      const text = getText($, el)
      if (text === "PRIMEIRO SORTEIO") current = "first"
      else if (text === "SEGUNDO SORTEIO") current = "second"
      return
    }
    if (tag === "div" && $(el).hasClass("alinha-numeros")) {
      const nums = []
      $(el).find(".numero-individual, .numero-individual-2").each((_, n) => {
        const v = parseInt(getText($, n), 10)
        if (!isNaN(v)) nums.push(v)
      })
      if (current === "first") firstDraw.numbers = nums
      else if (current === "second") secondDraw.numbers = nums
      allNumbers.push(...nums)
    }
    if (tag === "div" && $(el).hasClass("resultados")) {
      const res = parseResultados($, $(el))
      if (current === "first") {
        firstDraw.prizes = res.prizes
        firstDraw.winners = res.winners
      } else if (current === "second") {
        secondDraw.prizes = res.prizes
        secondDraw.winners = res.winners
        secondDraw.nextPrize = res.nextPrize
        secondDraw.nextDate = res.nextDate
        secondDraw.summary = res.summary
        secondDraw.notice = res.notice
      }
    }
  })

  // Merge both draw prizes into main array for data compatibility
  const combinedPrizes = [...firstDraw.prizes, ...secondDraw.prizes]
  const winners = firstDraw.winners || secondDraw.winners

  return {
    id, date, dayOfWeek, numbers: allNumbers,
    draws: [firstDraw, secondDraw],
    prizes: combinedPrizes,
    winners,
    nextPrize: secondDraw.nextPrize,
    nextDate: secondDraw.nextDate,
    summary: secondDraw.summary || undefined,
    notice: secondDraw.notice || undefined,
  }
}

// --- Mais Milionária ---
function parseMaisMilionaria($, $card) {
  const $topo = $card.find(".topo-tabela")
  const id = parseConcurso(getText($, $topo.find("h3")))
  const { dayOfWeek, date } = parseDateInfo(getText($, $topo.find("p").first()))
  const numbers = []
  $card.find(".alinha-numeros .numero-individual").each((_, el) => {
    const n = parseInt(getText($, el), 10); if (!isNaN(n)) numbers.push(n)
  })
  const trevos = []
  $card.find(".alinha-numeros .numero-individual-2").each((_, el) => {
    const n = parseInt(getText($, el), 10); if (!isNaN(n)) trevos.push(n)
  })
  const res = parseResultados($, $card.find(".resultados"))
  return { id, date, dayOfWeek, numbers, trevos, ...res }
}

// --- Super Sete ---
function parseSuperSete($, $card) {
  const $topo = $card.find(".topo-tabela")
  const id = parseConcurso(getText($, $topo.find("h3")))
  const { dayOfWeek, date } = parseDateInfo(getText($, $topo.find("p").first()))
  const numbers = []
  $card.find(".supersete-individual").each((_, el) => {
    const text = $(el).text().trim()
    const m = text.match(/\d+ª\s*Coluna\s*(\d+)/)
    if (m) numbers.push(parseInt(m[1], 10))
  })
  const res = parseResultados($, $card.find(".resultados"))
  return { id, date, dayOfWeek, numbers, ...res }
}

// --- Timemania (same as standard but team in resultados) ---
function parseTimemania($, $card) {
  const result = parseStandard($, $card)
  const resultadosText = $card.find(".resultados").text()
  const teamMatch = resultadosText.match(/Time do coração:\s*([^\n]+)/)
  if (teamMatch) result.team = teamMatch[1].trim()
  return result
}

// --- Dia de Sorte (same as standard but month in resultados) ---
function parseDiaDeSorte($, $card) {
  const result = parseStandard($, $card)
  const resultadosText = $card.find(".resultados").text()
  const monthMatch = resultadosText.match(/Mês da Sorte:\s*([^\n]+)/)
  if (monthMatch) result.month = monthMatch[1].trim()
  return result
}

// --- Bicho state page ---
function parseBichoState($, $card) {
  const $topo = $card.find(".topo-tabela-titulos")
  const sorteio = getText($, $topo.find(".sorteio")).replace("Sorteio ", "")
  const titulo = getText($, $topo.find(".titulo"))
  const textoData = getText($, $topo.find(".texto-sorteio"))
  const { dayOfWeek, date } = parseDateInfo(textoData)

  const prizes = []
  $card.find(".bicho-individual").each((_, el) => {
    const $el = $(el)
    const posText = getText($, $el.find(".numero-individual"))
    const position = parseInt(posText.replace(/[º°]/, ""), 10) || 0
    const milhar = getText($, $el.find(".milhar"))
    const smallText = getText($, $el.find("small"))
    let animal = smallText
    let group = 0
    const gm = smallText.match(/\((\d+)\)/)
    if (gm) { group = parseInt(gm[1], 10); animal = smallText.replace(/\(\d+\)/, "").trim() }
    prizes.push({ position, milhar, animal, group: group || undefined })
  })

  // Capture extra content beyond bicho-individual (e.g. Super 5, 26 da Sorte)
  const extra = []
  $card.find(".numeros-bicho").children("p").each((_, el) => {
    const $el = $(el)
    const bold = $el.find("b, strong")
    if (!bold.length) return
    const text = bold.first().text().trim()
    // Skip Soma / Multiplicação (already part of prizes)
    if (text === "Soma" || text.startsWith("Soma ") || text === "Multiplicação" || text.startsWith("Multiplicação ")) return
    // Try to parse "LABEL: NUMBERS" pattern
    const colonIdx = text.indexOf(":")
    if (colonIdx > 0) {
      const afterColon = text.slice(colonIdx + 1).trim()
      const numbers = afterColon.split(/[\s,;]+/).filter(t => t && /^\d+$/.test(t))
      if (numbers.length >= 2) {
        extra.push({ type: "numbers", label: text.slice(0, colonIdx).trim(), values: numbers })
        return
      }
    }
    // Fallback: store as text
    extra.push({ type: "text", text })
  })

  return { sorteio, titulo, dayOfWeek, date, prizes, extra: extra.length ? extra : undefined }
}

/** Normalize string for comparison (strip diacritics) */
function norm(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

/** Validate scraped bicho data integrity */
function validateBichoDraw(draw, slug) {
  const issues = []
  // Check date format
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(draw.date)) {
    issues.push(`日期格式异常: ${draw.date}`)
  }
  // Validate prizes
  for (const p of draw.prizes) {
    if (p.animal === "Soma" || p.animal === "Multiplicação") continue
    // Check milhar is 4 or 5 digits (soma/mult can be longer)
    if (p.position <= 5 && !/^\d{4}$/.test(p.milhar)) {
      issues.push(`第${p.position}名 milhar 非4位数字: ${p.milhar}`)
    }
    // Check animal group consistency
    if (p.group) {
      const knownGroups = {1:"Avestruz",2:"Águia",3:"Burro",4:"Borboleta",5:"Cachorro",6:"Cabra",7:"Carneiro",8:"Camelo",9:"Cobra",10:"Coelho",11:"Cavalo",12:"Elefante",13:"Galo",14:"Gato",15:"Jacaré",16:"Leão",17:"Macaco",18:"Porco",19:"Pavão",20:"Peru",21:"Touro",22:"Tigre",23:"Urso",24:"Veado",25:"Vaca"}
      const expectedAnimal = knownGroups[p.group]
      if (expectedAnimal && norm(p.animal) !== norm(expectedAnimal)) {
        issues.push(`第${p.position}名 动物/组号不匹配: ${p.animal}(${p.group}), 预期=${expectedAnimal}`)
      }
    }
  }
  // Verify Soma calculation for positions 1-5
  const top5 = draw.prizes.filter(p => p.position >= 1 && p.position <= 5)
  const somaPrize = draw.prizes.find(p => p.animal === "Soma")
  if (top5.length === 5 && somaPrize) {
    const calcSoma = top5.reduce((s, p) => s + parseInt(p.milhar, 10), 0)
    if (String(calcSoma) !== somaPrize.milhar) {
      issues.push(`Soma 校验失败: 计算值=${calcSoma}, 页面值=${somaPrize.milhar}`)
    }
  }
  return issues
}

// --- URL discovery from homepage ---
async function discoverUrls() {
  const html = await fetchPage("/")
  const $ = cheerio.load(html)
  const lotteries = []
  const bichoStates = []

  $(".submenu-loteria a").each((_, el) => {
    const href = $(el).attr("href")
    const path = href.startsWith("http") ? new URL(href).pathname : href.startsWith("/") ? href : `/${href}`
    const name = path.replace(/^\/+|\/+$/g, "")
    lotteries.push({ path, name })
  })

  $(".submenu-bicho a").each((_, el) => {
    const href = $(el).attr("href")
    const path = href.startsWith("http") ? new URL(href).pathname : href.startsWith("/") ? href : `/${href}`
    const title = $(el).attr("title") || getText($, el)
    const name = path.replace(/^\/+|\/+$/g, "")
    bichoStates.push({ path, name, title })
  })

  return { lotteries, bichoStates }
}

async function scrapePage(path, parserFn, $) {
  // If $ is provided, we already have the HTML parsed
  if ($) return parserFn($)
  console.log(`  Fetching ${path}...`)
  const html = await fetchPage(path)
  const $local = cheerio.load(html)
  return parserFn($local)
}

const PARSERS = {
  "mega-sena": ($) => { const r = []; $(".caixa-tabela.megasena").each((_, e) => r.push(parseStandard($, $(e)))); return r },
  "lotofacil": ($) => { const r = []; $(".caixa-tabela.lotofacil").each((_, e) => r.push(parseStandard($, $(e)))); return r },
  "quina": ($) => { const r = []; $(".caixa-tabela.quina").each((_, e) => r.push(parseStandard($, $(e)))); return r },
  "lotomania": ($) => { const r = []; $(".caixa-tabela.lotomania").each((_, e) => r.push(parseStandard($, $(e)))); return r },
  "loteria-federal": ($) => { const r = []; $(".caixa-tabela.federal").each((_, e) => r.push(parseFederal($, $(e)))); return r },
  "dupla-sena": ($) => { const r = []; $(".caixa-tabela.duplasena").each((_, e) => r.push(parseDuplaSena($, $(e)))); return r },
  "mais-milionaria": ($) => { const r = []; $(".caixa-tabela.maismilionaria").each((_, e) => r.push(parseMaisMilionaria($, $(e)))); return r },
  "super-sete": ($) => { const r = []; $(".caixa-tabela.supersete").each((_, e) => r.push(parseSuperSete($, $(e)))); return r },
  "timemania": ($) => { const r = []; $(".caixa-tabela.timemania").each((_, e) => r.push(parseTimemania($, $(e)))); return r },
  "dia-de-sorte": ($) => { const r = []; $(".caixa-tabela.diadesorte").each((_, e) => r.push(parseDiaDeSorte($, $(e)))); return r },
}

async function main() {
  console.log("Discovering URLs from homepage...")
  const { lotteries, bichoStates } = await discoverUrls()
  console.log(`  Found ${lotteries.length} lottery pages, ${bichoStates.length} bicho state pages`)

  // Scrape all lottery pages (skip info pages like puxadas, tabela)
  const lotteryResults = {}
  for (const { path, name } of lotteries) {
    if (!PARSERS[name]) { console.log(`  Skipping ${path} (no parser for "${name}")`); continue }
    const html = await fetchPage(path)
    const $ = cheerio.load(html)
    lotteryResults[name] = PARSERS[name]($)
    console.log(`  ${path}: ${lotteryResults[name].length} results`)
  }

  // Scrape all bicho state pages (skip puxadas, tabela, palpite)
  const bichoResults = {}
  for (const { path, name, title } of bichoStates) {
    if (["puxadas-jogo-do-bicho", "tabela-jogo-do-bicho", "palpites-jogo-do-bicho"].includes(name)) {
      console.log(`  Skipping ${path} (info page)`)
      continue
    }
    const html = await fetchPage(path)
    const $ = cheerio.load(html)
    const draws = []
    $(".caixa-tabela.bixo").each((_, el) => {
      const draw = parseBichoState($, $(el))
      // Validate integrity
      const issues = validateBichoDraw(draw, name)
      if (issues.length > 0) {
        console.warn(`  ⚠️  ${name} - ${draw.date} ${draw.sorteio}: ${issues.join("; ")}`)
      }
      draws.push(draw)
    })
    bichoResults[name] = draws
    console.log(`  ${path}: ${draws.length} draws`)
  }

  // Build output
  const output = {
    scrapedAt: new Date().toISOString(),
    version: 2,
    lotteries: lotteryResults,
    bicho: bichoResults,
  }

  const outDir = resolve(__dirname, "..", "public", "data")
  mkdirSync(outDir, { recursive: true })
  const outPath = resolve(outDir, "resultados.json")
  writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8")

  const totalLottery = Object.values(lotteryResults).reduce((s, a) => s + a.length, 0)
  const totalBicho = Object.values(bichoResults).reduce((s, a) => s + a.length, 0)
  console.log(`\nDone! Written to ${outPath}`)
  console.log(`  Lotteries: ${totalLottery} results across ${Object.keys(lotteryResults).length} types`)
  console.log(`  Bicho: ${totalBicho} draws across ${Object.keys(bichoResults).length} states`)
}

async function scrapeSingle(slug) {
  const { lotteries, bichoStates } = await discoverUrls()

  const isLottery = lotteries.find((l) => l.name === slug)
  const isBicho = bichoStates.find((b) => b.name === slug)

  if (isLottery) {
    if (!PARSERS[slug]) throw new Error(`No parser for lottery "${slug}"`)
    const html = await fetchPage(isLottery.path)
    const $ = cheerio.load(html)
    return { type: "lottery", slug, data: PARSERS[slug]($) }
  }

  if (isBicho) {
    const html = await fetchPage(isBicho.path)
    const $ = cheerio.load(html)
    const draws = []
    $(".caixa-tabela.bixo").each((_, el) => {
      draws.push(parseBichoState($, $(el)))
    })
    return { type: "bicho", slug, data: draws }
  }

  throw new Error(`Unknown slug "${slug}"`)
}

async function updateSingle(slug) {
  const result = await scrapeSingle(slug)
  const outDir = resolve(__dirname, "..", "public", "data")
  const outPath = resolve(outDir, "resultados.json")
  mkdirSync(outDir, { recursive: true })

  let existing = {}
  try {
    existing = JSON.parse(readFileSync(outPath, "utf-8"))
  } catch { /* file doesn't exist */ }

  existing.scrapedAt = new Date().toISOString()
  existing.version = existing.version || 2

  if (result.type === "lottery") {
    existing.lotteries = existing.lotteries || {}
    existing.lotteries[slug] = result.data
  } else {
    existing.bicho = existing.bicho || {}
    existing.bicho[slug] = result.data
  }

  writeFileSync(outPath, JSON.stringify(existing, null, 2), "utf-8")
  console.log(`Updated ${slug}: ${result.type === "lottery" ? result.data.length + " results" : result.data.length + " draws"}`)
  return existing
}

// Support --slug argument
const slugIdx = process.argv.indexOf("--slug")
if (slugIdx !== -1 && process.argv[slugIdx + 1]) {
  const targetSlug = process.argv[slugIdx + 1]
  updateSingle(targetSlug).catch((err) => {
    console.error(`Scraper failed for ${targetSlug}:`, err)
    process.exit(1)
  })
} else {
  main().catch((err) => {
    console.error("Scraper failed:", err)
    process.exit(1)
  })
}
