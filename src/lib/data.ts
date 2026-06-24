import { readFileSync } from "fs"
import { join } from "path"
import type { LotteryResult, BichoResult } from "@/types"
import { rawToBichoResult } from "./bicho-utils"
import type { RawBichoDraw } from "./bicho-utils"

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

export function getLotteryResults(slug: string): LotteryResult[] {
  return load().lotteries[slug] || []
}

export function getBichoResults(slug: string): BichoResult[] {
  const raw = load().bicho[slug]
  if (!raw) return []
  return raw.map((r) => rawToBichoResult(r, slug))
}
