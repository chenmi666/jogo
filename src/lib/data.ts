import { readFileSync } from "fs"
import { join } from "path"
import type { LotteryResult, BichoResult, BichoPrize } from "@/types"

interface RawBichoDraw {
  sorteio: string
  dayOfWeek: string
  date: string
  prizes: BichoPrize[]
}

interface ScrapedData {
  lotteries: Record<string, LotteryResult[]>
  bicho: Record<string, RawBichoDraw[]>
}

let _data: ScrapedData | null = null

function load(): ScrapedData {
  if (!_data) {
    _data = JSON.parse(
      readFileSync(join(process.cwd(), "public", "data", "resultados.json"), "utf-8"),
    ) as ScrapedData
  }
  return _data
}

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

function cleanTime(raw: string): string {
  return raw.replace(/\s+\d+º\s+ao\s+\d+º/, "")
}

function formatDateLong(dateStr: string): string {
  const [day, month, year] = dateStr.split("/")
  return `${parseInt(day, 10)} de ${MONTHS[parseInt(month, 10) - 1]} de ${year}`
}

export function getLotteryResults(slug: string): LotteryResult[] {
  return load().lotteries[slug] || []
}

export function getBichoResults(slug: string): BichoResult[] {
  const raw = load().bicho[slug]
  if (!raw) return []

  const stateBase = slug.replace(/-/g, "")
  const stateDisplay = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  return raw.map((r) => {
    const time = cleanTime(r.sorteio)
    const timeId = time.replace(/[^a-z0-9]/g, "").substring(0, 8)
    const dateId = r.date.split("/").slice(0, 2).join("")
    const id = `${stateBase}-${timeId}-${dateId}`

    const firstPrize = r.prizes[0]
    let timeLabel =
      `Resultado Deu no Poste do Jogo do Bicho do ${stateDisplay} de ${r.dayOfWeek} ${formatDateLong(r.date)}, sorteio ${time}`
    if (firstPrize) {
      timeLabel += ` premiou a milhar ${firstPrize.milhar} e o bicho ${firstPrize.animal} no primeiro prêmio.`
    } else {
      timeLabel += "."
    }

    return { id, date: r.date, dayOfWeek: r.dayOfWeek, time, timeLabel, prizes: r.prizes }
  })
}
