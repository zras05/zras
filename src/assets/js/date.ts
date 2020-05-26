import { DateWithPrecision } from './models';

/*

language: 0
  precision : 0 -> 2020
  precision : 1 -> 2020-01
  precision : 2 -> 2020-01-01
  precision : 3 -> 2020-01-01 23
  precision : 4 -> 2020-01-01 23:59
  precision : 5 -> 2020-01-01 23:59:59
  precision : 6 -> 23:59 周一
  default: 2020-01-01

language: 1
  precision : 0 -> Jan 01
  precision : 1 -> Jan 01, 2020
  precision : 2 -> Jan 01, 11:59AM
  default: Jan 01, 2020

*/

const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',]

export const addZero = (num: number) => (num < 10 ? "0" + num : num)

export const timestampToDate = ({ timestamp, precision = 2, language = 0 }: DateWithPrecision) => {
  const len = timestamp.toString().length
  if (len < 13) {
    timestamp *= 1000
  }
  const date = new Date(timestamp)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const w = date.getDay()
  let str = ''
  switch (language) {
    case 0:
      switch (precision) {
        case 0:
          str = `${Y}`
          break
        case 1:
          str = `${Y}-${addZero(M)}`
          break
        case 3:
          str = `${Y}-${addZero(M)}-${addZero(D)} ${addZero(h)}`
          break
        case 4:
          str = `${Y}-${addZero(M)}-${addZero(D)} ${addZero(h)}:${addZero(m)}`
          break
        case 5:
          str = `${Y}-${addZero(M)}-${addZero(D)} ${addZero(h)}:${addZero(m)}:${addZero(s)}`
          break
        case 6:
          str = ` ${addZero(h)}:${addZero(m)} ${week[w - 1]}`
          break
        case 2:
        default:
          str = `${Y}-${addZero(M)}-${addZero(D)}`
      }
      break
    case 1:
      switch (precision) {
        case 0:
          str = `${month[(M - 1)]} ${addZero(D)}`
          break
        case 2:
          str = `${month[(M - 1)]} ${addZero(D)}, ${Y}, `
          if (h > 12) {
            str += `${addZero(h - 12)}:${addZero(m)}PM`
          } else {
            str += `${addZero(h)}:${addZero(m)}AM`
          }
          break
        case 1:
        default:
          str = `${month[(M - 1)]} ${addZero(D)}, ${Y}`
      }
      break
    default:
      str = `${Y}-${addZero(M)}-${addZero(D)}`
  }
  return str
}