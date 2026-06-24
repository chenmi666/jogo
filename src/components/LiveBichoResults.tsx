"use client"

import { useState, useEffect, useRef } from "react"
import type { BichoResult } from "@/types"
import { rawToBichoResult, compactBichoResult } from "@/lib/bicho-utils"
import type { RawBichoDraw } from "@/lib/bicho-utils"
import AnimalResultCard from "./AnimalResultCard"

export default function LiveBichoResults({
  initialData,
  slug,
  compact,
}: {
  initialData: BichoResult[]
  slug: string
  compact?: boolean
}) {
  const [data, setData] = useState(initialData)
  const initialIdRef = useRef(initialData[0]?.id)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/data/resultados.json")
        const json = await res.json()
        const rawData: RawBichoDraw[] = json.bicho?.[slug]
        if (!rawData?.length) return

        let newData = rawData.map((r) => rawToBichoResult(r, slug))
        if (newData[0].id !== initialIdRef.current) {
          initialIdRef.current = newData[0].id
          if (compact) newData = newData.map(compactBichoResult)
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
