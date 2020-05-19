import { DateWithPrecision } from './models';

export const addZreo = (num: number) => (num < 10 ? "0" + num : num)

export const translationDate = ({timestamp, precision = 2}:DateWithPrecision) => {
  const date = new Date(timestamp)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  switch (precision) {
    case 0:
      return `${Y}`
    case 1:
      return `${Y}-${addZreo(M)}`
    case 2:
      return `${Y}-${addZreo(M)}-${addZreo(D)}`
    case 3:
      return `${Y}-${addZreo(M)}-${addZreo(D)} ${h}`
    case 4:
      return `${Y}-${addZreo(M)}-${addZreo(D)} ${h}:${addZreo(m)}`
    case 5:
      return `${Y}-${addZreo(M)}-${addZreo(D)} ${h}:${addZreo(m)}:${addZreo(s)}`
    default:
      return `${Y}-${addZreo(M)}-${addZreo(D)}`
  }
}