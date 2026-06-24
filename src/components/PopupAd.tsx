"use client"

import { useEffect, useRef, useCallback } from "react"

export default function PopupAd() {
  const popupRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const closePopup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (popupRef.current) {
      popupRef.current.style.display = "none"
    }
    localStorage.setItem("lastPopupTime", new Date().getTime().toString())
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      const lastTime = localStorage.getItem("lastPopupTime")
      let shouldShow = true
      if (lastTime) {
        const diff = new Date().getTime() - parseInt(lastTime)
        shouldShow = diff > 6 * 60 * 60 * 1000
      }
      if (shouldShow && popupRef.current) {
        popupRef.current.style.display = "flex"
      }
    }, 6500)

    timeoutRef.current = handler

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div id="popup" className="popup" ref={popupRef}>
      <div className="popup-content">
        <span
          className="close-btn"
          onClick={closePopup}
          style={{ cursor: "pointer" }}
        >
          Fechar &times;
        </span>
        <a
          target="_blank"
          href="https://playbicho.com/cadastrar?ref_code=blog"
          rel="nofollow noopener"
        >
          <img
            src="/221102/imagens/config/15062026015304.jpg"
            alt="PlayBicho - Cadastre-se"
            style={{ width: "100%", height: "auto" }}
          />
        </a>
      </div>
    </div>
  )
}
