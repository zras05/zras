export interface DateWithPrecision {
  timestamp: number
  precision?: number
}


export interface SingleType {
  singleID: number
  singlenName: string
  version?: string
}

export interface AlbumDirectoryType {
  albumID: number
  albumName: string
  directory?: SingleType[]
  date: number | DateWithPrecision[]
  type: number
  source?: string
}
