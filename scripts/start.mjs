import { spawn } from "child_process"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

// Start scheduler
const scheduler = spawn("node", ["scripts/scheduler.mjs"], {
  cwd: root,
  stdio: "inherit",
})

// Start Next.js
const next = spawn("node", ["./node_modules/next/dist/bin/next", "start"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, PORT: process.env.PORT || "3000" },
})

function cleanup() {
  scheduler.kill()
  next.kill()
}

process.on("SIGINT", cleanup)
process.on("SIGTERM", cleanup)

next.on("close", (code) => {
  console.log(`Next.js exited with code ${code}`)
  cleanup()
  process.exit(code ?? 0)
})
