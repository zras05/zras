export interface DateWithPrecision {
  timestamp: number
  precision?: number
  language?: number
}

export interface RequestModel {
  type: string
  url: string
  params?: any
}