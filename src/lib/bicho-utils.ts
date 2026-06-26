import type { BichoResult, BichoPrize, ExtraItem } from "@/types"

export interface RawBichoDraw {
  sorteio: string
  titulo?: string
  dayOfWeek: string
  date: string
  prizes: BichoPrize[]
  extra?: ExtraItem[]
}

export const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

export function cleanTime(raw: string): string {
  return raw.replace(/\s+\d+º\s+ao\s+\d+º/, "")
}

export function formatDateLong(dateStr: string): string {
  const [day, month, year] = dateStr.split("/")
  return `${parseInt(day, 10)} de ${MONTHS[parseInt(month, 10) - 1]} de ${year}`
}

export function rawToBichoResult(raw: RawBichoDraw, slug: string): BichoResult {
  const stateDisplay = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
  const stateBase = slug.replace(/-/g, "")
  const time = cleanTime(raw.sorteio)
  const timeId = time.replace(/[^a-z0-9]/g, "").substring(0, 8)
  const dateId = raw.date.split("/").slice(0, 2).join("")
  const id = `${stateBase}-${timeId}-${dateId}`

  const firstPrize = raw.prizes[0]
  let timeLabel =
    `Resultado Deu no Poste do Jogo do Bicho do ${stateDisplay} de ${raw.dayOfWeek} ${formatDateLong(raw.date)}, sorteio ${time}`
  if (firstPrize) {
    timeLabel += ` premiou a milhar ${firstPrize.milhar} e o bicho ${firstPrize.animal} no primeiro prêmio.`
  } else {
    timeLabel += "."
  }

  return { id, date: raw.date, dayOfWeek: raw.dayOfWeek, time, titulo: raw.titulo || "", timeLabel, prizes: raw.prizes, extra: raw.extra }
}

export function compactBichoResult(result: BichoResult, federalNumbers?: number[]): BichoResult {
  const top5 = result.prizes.slice(0, 5)
  const nums = top5.map((p) => parseInt(p.milhar, 10))
  const soma = nums.reduce((acc, n) => acc + n, 0)
  let p1 = nums[0], p2 = nums[1]
  if (federalNumbers && federalNumbers.length >= 2) {
    p1 = federalNumbers[0]
    p2 = federalNumbers[1]
  }
  const mult = String(Math.floor(p1 * p2 / 1000) % 1000).padStart(3, "0")
  return {
    ...result,
    prizes: [
      ...top5,
      { position: 6, milhar: String(soma), animal: "Soma" },
      { position: 7, milhar: mult, animal: "Multiplicação" },
    ],
  }
}
