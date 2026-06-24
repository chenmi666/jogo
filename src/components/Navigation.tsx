"use client"
import { useState } from "react"
import Link from "next/link"
import { bichoStates, caixaLoterias } from "@/data/navigation"

type Tab = "bicho" | "loteria"

export default function Navigation() {
  const [activeTab, setActiveTab] = useState<Tab>("bicho")

  const items = activeTab === "bicho" ? bichoStates : caixaLoterias

  return (
    <nav className="navigation" style={{ display: "block" }}>
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === "bicho" ? "active" : ""}`}
          onClick={() => setActiveTab("bicho")}
        >
          Jogo do Bicho
        </button>
        <button
          className={`nav-tab ${activeTab === "loteria" ? "active" : ""}`}
          onClick={() => setActiveTab("loteria")}
        >
          Loterias da Caixa
        </button>
      </div>
      <div className="nav-grid">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="nav-grid-item" title={item.label}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
