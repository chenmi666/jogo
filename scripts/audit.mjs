import * as cheerio from "cheerio"
import { readFileSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = "https://deunoposte.app.br"
const SELF = "https://deunoposteagora.com"

const ANIMAL_GROUPS = {
  "Avestruz":1,"Águia":2,"Burro":3,"Borboleta":4,"Cachorro":5,"Cabra":6,
  "Carneiro":7,"Camelo":8,"Cobra":9,"Coelho":10,"Cavalo":11,"Elefante":12,
  "Galo":13,"Gato":14,"Jacaré":15,"Leâo":16,"Leão":16,"Macaco":17,"Porco":18,
  "Pavâo":19,"Pavão":19,"Peru":20,"Touro":21,"Tigre":22,"Urso":23,"Veado":24,"Vaca":25,
}

function normalizeAnimal(name) {
  return Object.keys(ANIMAL_GROUPS).find(
    k => k.toLowerCase() === name.trim().toLowerCase()
  ) || name.trim()
}

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return await res.text()
}

function parseDrawsFromHtml(html, source) {
  const $ = cheerio.load(html)
  const draws = []
  $(".caixa-tabela.bixo").each((_, el) => {
    const $card = $(el)
    const $topo = $card.find(".topo-tabela-titulos, .topo-tabela")
    const sorteio = $topo.find(".sorteio").text().replace("Sorteio ", "").trim()
    const textoData = $topo.find(".texto-sorteio").text().trim()
    const dataMatch = textoData.match(/(\d{2}\/\d{2}\/\d{4})/)
    if (!dataMatch) return
    const date = dataMatch[1]
    const dayOfWeek = textoData.replace(date, "").trim()

    // Skip 1º ao 10º expanded draws in comparison (they have different positions 6-10)
    if (sorteio.includes("1º ao 10º")) return

    const prizes = []
    $card.find(".bicho-individual").each((_, pe) => {
      const $pe = $(pe)
      const posText = $pe.find(".numero-individual").text().trim()
      const position = parseInt(posText.replace(/[º°]/, ""), 10) || 0
      const milhar = $pe.find(".milhar").text().trim()
      const smallText = $pe.find("small").text().trim()
      let animal = smallText, group = 0
      const gm = smallText.match(/\((\d+)\)/)
      if (gm) { group = parseInt(gm[1], 10); animal = smallText.replace(/\(\d+\)/, "").trim() }
      prizes.push({ position, milhar, animal, group })
    })

    draws.push({ source, sorteio, date, dayOfWeek, prizes })
  })
  return draws
}

function normalizeSorteio(name) {
  return name.replace(/\s+\d+º\s+ao\s+\d+º/, "").trim()
}

function compareDraws(targetDraws, selfDraws) {
  const results = []
  // Check target draws exist in self
  for (const t of targetDraws) {
    const s = selfDraws.find(d =>
      d.date === t.date && normalizeSorteio(d.sorteio) === normalizeSorteio(t.sorteio)
    )
    if (!s) {
      results.push({ date: t.date, sorteio: t.sorteio, status: "MISSING", detail: "开奖在你的网站缺失" })
      continue
    }

    const errors = []
    for (let i = 0; i < Math.min(t.prizes.length, s.prizes.length); i++) {
      const tp = t.prizes[i], sp = s.prizes[i]
      if (tp.milhar !== sp.milhar) {
        errors.push(`第${tp.position}名 milhar 不同: 目标=${tp.milhar}, 你的=${sp.milhar}`)
      }
      const tAnimal = normalizeAnimal(tp.animal)
      const sAnimal = normalizeAnimal(sp.animal)
      if (tAnimal !== sAnimal) {
        errors.push(`第${tp.position}名 animal 不同: 目标=${tp.animal}(${tp.group}), 你的=${sp.animal}(${sp.group})`)
      } else if (tp.group && sp.group && tp.group !== sp.group) {
        errors.push(`第${tp.position}名 group 不同: 目标=${tp.group}, 你的=${sp.group}`)
      }
    }
    if (t.prizes.length !== s.prizes.length) {
      errors.push(`总奖项数不同: 目标=${t.prizes.length}, 你的=${s.prizes.length}`)
    }
    results.push({ date: t.date, sorteio: t.sorteio, status: errors.length ? "DIFF" : "OK", errors })
  }

  // Check self draws NOT in target (extra draws)
  for (const s of selfDraws) {
    const t = targetDraws.find(d =>
      d.date === s.date && normalizeSorteio(d.sorteio) === normalizeSorteio(s.sorteio)
    )
    if (!t) {
      results.push({ date: s.date, sorteio: s.sorteio, status: "EXTRA", detail: "开奖在目标网站不存在(可能是历史数据或多余时段)" })
    }
  }

  return results
}

async function auditState(slug, label, useHomepage) {
  console.log(`\n=== ${label} (${slug}) ===`)
  // Rio de Janeiro's state page only has 1º ao 10º format; use homepage for compact comparison
  const targetUrl = useHomepage ? `${BASE}/` : `${BASE}/${slug}/`
  const selfUrl = useHomepage ? `${SELF}/` : `${SELF}/${slug}/`
  const [targetHtml, selfHtml] = await Promise.all([
    fetchText(targetUrl).catch(e => { console.error(`  目标站点 ${slug} 获取失败:`, e.message); return null }),
    fetchText(selfUrl).catch(e => { console.error(`  自己站点 ${slug} 获取失败:`, e.message); return null }),
  ])
  if (!targetHtml || !selfHtml) return { slug, label, error: true }

  const targetDraws = parseDrawsFromHtml(targetHtml, "target")
  const selfDraws = parseDrawsFromHtml(selfHtml, "self")
  console.log(`  目标站点: ${targetDraws.length} 个开奖`)
  console.log(`  自己站点: ${selfDraws.length} 个开奖`)

  const comparison = compareDraws(targetDraws, selfDraws)
  let pass = 0, fail = 0, miss = 0, extra = 0
  for (const r of comparison) {
    if (r.status === "OK") { pass++; continue }
    if (r.status === "MISSING") { miss++; console.log(`  ❌ 缺失: ${r.date} ${r.sorteio} - ${r.detail}`); continue }
    if (r.status === "EXTRA") { extra++; console.log(`  ➕ 多余: ${r.date} ${r.sorteio} - ${r.detail}`); continue }
    fail++
    console.log(`  ⚠️  差异: ${r.date} ${r.sorteio}`)
    for (const e of r.errors) console.log(`    - ${e}`)
  }
  console.log(`  结果: ${pass} 正确, ${fail} 差异, ${miss} 缺失, ${extra} 多余`)
  return { slug, label, pass, fail, miss, extra }
}

async function main() {
  const statesToAudit = [
    "rio-de-janeiro", "sao-paulo", "minas-gerais", "goias",
    "paratodos-bahia", "brasilia", "ceara", "paraiba", "parana",
    "pernambuco", "rio-grande-do-sul", "sergipe", "resultado-nacional",
  ]
  const labels = {
    "rio-de-janeiro": "Rio de Janeiro", "sao-paulo": "São Paulo",
    "minas-gerais": "Minas Gerais", "goias": "Goiás",
    "paratodos-bahia": "Bahia", "brasilia": "Brasília",
    "ceara": "Ceará", "paraiba": "Paraíba", "parana": "Paraná",
    "pernambuco": "Pernambuco", "rio-grande-do-sul": "Rio Grande do Sul",
    "sergipe": "Sergipe", "resultado-nacional": "Loteria Nacional",
  }

  console.log("==========================================")
  console.log("数据一致性审计 - 目标 vs 自己")
  console.log(`时间: ${new Date().toISOString()}`)
  console.log("==========================================")

  let totalPass = 0, totalFail = 0, totalMiss = 0, totalExtra = 0
  for (const slug of statesToAudit) {
    // Rio de Janeiro state page only has 1º ao 10º, use homepage for compact data
    const useHomepage = slug === "rio-de-janeiro"
    const result = await auditState(slug, labels[slug] || slug, useHomepage)
    totalPass += result.pass || 0
    totalFail += result.fail || 0
    totalMiss += result.miss || 0
    totalExtra += result.extra || 0
  }

  console.log("\n==========================================")
  console.log("审计总结")
  console.log(`  正确: ${totalPass}`)
  console.log(`  差异: ${totalFail}`)
  console.log(`  缺失: ${totalMiss}`)
  console.log(`  多余: ${totalExtra}`)
  console.log(`  总开奖数: ${totalPass + totalFail + totalMiss + totalExtra}`)
  console.log(`  一致率: ${totalPass ? ((totalPass / (totalPass + totalFail + totalMiss + totalExtra)) * 100).toFixed(1) : 0}%`)

  const report = { timestamp: new Date().toISOString(), totalPass, totalFail, totalMiss, totalExtra }
  const outPath = resolve(__dirname, "..", "public", "data", "audit-report.json")
  writeFileSync(outPath, JSON.stringify(report, null, 2), "utf-8")
  console.log(`\n报告已写入: ${outPath}`)
  console.log("==========================================")
}

main().catch(console.error)
