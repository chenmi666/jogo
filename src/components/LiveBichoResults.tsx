"use client"

import { useState, useEffect, useRef } from "react"
import type { BichoResult } from "@/types"
import AnimalResultCard from "./AnimalResultCard"

export default function LiveBichoResults({
  initialData,
  slug,
}: {
  initialData: BichoResult[]
  slug: string
}) {
  const [data, setData] = useState(initialData)
  const initialIdRef = useRef(initialData[0]?.id)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/data/resultados.json")
        const json = await res.json()
        const newData: BichoResult[] | undefined = json.bicho?.[slug]
        if (newData?.length && newData[0].id !== initialIdRef.current) {
          initialIdRef.current = newData[0].id
          setData(newData)
        }
      } catch {
        // ignore
      }
    }, 60_000)
    return () => clearInterval(interval)
  }, [slug])

  return (
    <>
      {data.map((result) => (
        <AnimalResultCard key={result.id} result={result} />
      ))}
    </>
  )
}
