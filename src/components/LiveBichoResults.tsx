"use client"

import { useState, useEffect, useRef } from "react"
import type { BichoResult, BichoPrize } from "@/types"
import AnimalResultCard from "./AnimalResultCard"

function compactOne(result: BichoResult): BichoResult {
  const top5 = result.prizes.slice(0, 5)
  const nums = top5.map((p) => parseInt(p.milhar, 10))
  const soma = nums.reduce((acc, n) => acc + n, 0)
  const mult = Math.floor(nums[0] * nums[1] / 1000) % 1000
  return {
    ...result,
    prizes: [
      ...top5,
      { position: 6, milhar: String(soma), animal: "Soma" },
      { position: 7, milhar: String(mult), animal: "Multiplicação" },
    ],
  }
}

export default function LiveBichoResults({
  initialData,
  slug,
  compact,
}: {
  initialData: BichoResult[]
  slug: string
  compact?: boolean
}) {
  const [data, setData] = useState(() => (compact ? initialData.map(compactOne) : initialData))
  const initialIdRef = useRef(initialData[0]?.id)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/data/resultados.json")
        const json = await res.json()
        let newData: BichoResult[] | undefined = json.bicho?.[slug]
        if (newData?.length && newData[0].id !== initialIdRef.current) {
          initialIdRef.current = newData[0].id
          if (compact) newData = newData.map(compactOne)
          setData(newData)
        }
      } catch {
        // ignore
      }
    }, 60_000)
    return () => clearInterval(interval)
  }, [slug, compact])

  return (
    <>
      {data.map((result) => (
        <AnimalResultCard key={result.id} result={result} />
      ))}
    </>
  )
}
