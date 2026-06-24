export interface LotteryPrize {
  hits: number
  winners: number
  value: number
}

export interface LotteryResult {
  id: string
  date: string
  dayOfWeek: string
  numbers: number[]
  prizes: LotteryPrize[]
  winners: string
  nextPrize: number
  nextDate: string
  summary?: string
  notice?: string
  trevos?: number[]
  month?: string
  team?: string
}

export interface BichoPrize {
  position: number
  milhar: string
  animal: string
  group?: number
}

export interface BichoResult {
  id: string
  date: string
  dayOfWeek: string
  time: string
  timeLabel: string
  prizes: BichoPrize[]
}

export interface NavItem {
  label: string
  href: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface LotteryMeta {
  slug: string
  name: string
  description: string
  color?: string
}

export interface BichoStateMeta {
  slug: string
  name: string
  description: string
}
