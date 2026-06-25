import type { LotteryResult } from "@/types"

function formatFederal(num: number) {
  const s = num.toString().padStart(5, "0")
  return `${s.slice(0, 2)}.${s.slice(2)}`
}

const fmt2 = (n: number) => n.toString().padStart(2, "0")
const brl = (v: number) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })

function FederalNumbers({ result }: { result: LotteryResult }) {
  return (
    <div>
      {result.numbers.map((num, idx) => (
        <div key={idx} className="federal-individual">
          <span className="numero-individual numero-esquerda">
            {idx + 1}º Prêmio
          </span>
          <div className="numero-direita">
            {formatFederal(num)}
            <span className="numero-individual">
              R$ {brl(result.prizes[idx].value)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function DuplaSenaBody({ result }: { result: LotteryResult }) {
  const first = result.numbers.slice(0, 6)
  const second = result.numbers.slice(6)
  return (
    <>
      <h3>PRIMEIRO SORTEIO</h3>
      <div className="alinha-numeros">
        {first.map((num, idx) => (
          <span key={idx} className="numero-individual">{fmt2(num)}</span>
        ))}
      </div>
      <div className="resultados">
        {result.prizes.map((prize, idx) => (
          <p key={idx}>
            <strong>{prize.hits} acertos</strong> {prize.winners} aposta(s) R$ {brl(prize.value)}
          </p>
        ))}
        <p><strong>Ganhadores</strong> {result.winners}</p>
      </div>

      <h3>SEGUNDO SORTEIO</h3>
      <div className="alinha-numeros">
        {second.map((num, idx) => (
          <span key={idx} className="numero-individual-2">{fmt2(num)}</span>
        ))}
      </div>
      <div className="resultados">
        {result.prizes.map((prize, idx) => (
          <p key={idx}>
            <strong>{prize.hits} acertos</strong> {prize.winners} aposta(s) R$ {brl(prize.value)}
          </p>
        ))}
        <p><strong>Ganhadores</strong> {result.winners}</p>
        <p className="mb-0"><strong>Próximo sorteio</strong></p>
        <p className="valor">R$ {brl(result.nextPrize)}</p>
        <p>{result.nextDate}</p>
        {result.summary && <p>{result.summary}</p>}
        {result.notice && <p><em>{result.notice}</em></p>}
      </div>
    </>
  )
}

function SuperSeteBody({ result }: { result: LotteryResult }) {
  return (
    <div className="numeros-supersete">
      {result.numbers.map((num, idx) => (
        <div key={idx} className="supersete-individual">
          <span className="numero-individual">{idx + 1}ª Coluna</span>
          {num}
        </div>
      ))}
    </div>
  )
}

export default function LotteryResultCard({
  result,
  lotteryName,
  cssClass,
}: {
  result: LotteryResult
  lotteryName: string
  cssClass?: string
}) {
  return (
    <div>
      <p className="chamada-tabela">
        Resultado da {lotteryName} concurso {result.id} de {result.dayOfWeek}{" "}
        dia {result.date}.
      </p>
      <div className={`caixa-tabela ${cssClass || "megasena"}`}>
        <div className="topo-tabela">
          <h3>
            {lotteryName} <span>Concurso {result.id}</span>
          </h3>
          <p>
            {result.dayOfWeek} {result.date}
          </p>
        </div>
        <div className="conteudo-tabela">
          {cssClass === "federal" ? (
            <FederalNumbers result={result} />
          ) : cssClass === "duplasena" ? (
            <DuplaSenaBody result={result} />
          ) : cssClass === "supersete" ? (
            <SuperSeteBody result={result} />
          ) : (
            <>
              <div
                className={
                  cssClass === "lotofacil" || cssClass === "lotomania"
                    ? `alinha-numeros ${cssClass}`
                    : "alinha-numeros"
                }
              >
                {result.numbers.map((num, idx) => (
                  <span key={idx} className="numero-individual">
                    {fmt2(num)}
                  </span>
                ))}
              </div>
              {cssClass === "maismilionaria" && result.trevos && (
                <>
                  <h3>Trevos</h3>
                  <div className="alinha-numeros">
                    {result.trevos.map((num, idx) => (
                      <span key={idx} className="numero-individual-2">
                        {fmt2(num)}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {cssClass !== "federal" && cssClass !== "duplasena" && (
            <div className={`resultados ${cssClass === "timemania" ? "pt-1" : ""}`}>
              {cssClass === "timemania" && result.team && (
                <p>Time do coração: <span className="font-weight-bold">{result.team}</span></p>
              )}
              {cssClass === "diadesorte" && result.month && (
                <p>Mês da Sorte: <span className="font-weight-bold">{result.month}</span></p>
              )}
              {result.prizes.map((prize, idx) => (
                <p key={idx}>
                  <strong>{prize.hits} acertos</strong> {prize.winners}{" "}
                  aposta(s) R$ {brl(prize.value)}
                </p>
              ))}
              <p>
                <strong>Ganhadores</strong> {result.winners}
              </p>
              <p className="mb-0">
                <strong>Próximo sorteio</strong>
              </p>
              <p className="valor">R$ {brl(result.nextPrize)}</p>
              <p>{result.nextDate}</p>
              {result.summary && <p>{result.summary}</p>}
              {result.notice && (
                <p>
                  <em>{result.notice}</em>
                </p>
              )}
            </div>
          )}
          {cssClass === "federal" && (
            <div className="resultados">
              <p className="mb-0"><strong>Próximo sorteio</strong></p>
              <p className="valor">R$ {brl(result.nextPrize)}</p>
              <p>{result.nextDate}</p>
              {result.summary && <p>{result.summary}</p>}
              {result.notice && <p><em>{result.notice}</em></p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
