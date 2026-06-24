"use client"

import { useState, useEffect, useRef } from "react"
import type { LotteryResult } from "@/types"
import LotteryResultCard from "./LotteryResultCard"

export default function LiveLotteryResults({
  initialData,
  slug,
  lotteryName,
  cssClass,
}: {
  initialData: LotteryResult[]
  slug: string
  lotteryName: string
  cssClass: string
}) {
  const [data, setData] = useState(initialData)
  const initialIdRef = useRef(initialData[0]?.id)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/data/resultados.json")
        const json = await res.json()
        const newData: LotteryResult[] | undefined = json.lotteries?.[slug]
        if (newData?.length && newData[0].id !== initialIdRef.current) {
          initialIdRef.current = newData[0].id
          setData(newData)
        }
      } catch {
        // ignore fetch errors
      }
    }, 60_000)
    return () => clearInterval(interval)
  }, [slug])

  return (
    <>
      {data.map((result) => (
        <div key={result.id}>
          <div className="espaco-menor" />
          <LotteryResultCard
            result={result}
            lotteryName={lotteryName}
            cssClass={cssClass}
          />
        </div>
      ))}
    </>
  )
}
