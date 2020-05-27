import * as React from "react";

export const Date = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <div className="zras-page zras-date">
        <div className="code">
        <p className="title">Date</p>
          <pre>
            {`const week = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',]
const addZero = (num: number) => (num < 10 ? "0" + num : num)

const timestampToDate = ({ timestamp, precision = 2, language = 0 }) => {
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
          str = Y
          break
        case 1:
          str = Y-addZero(M)
          break
        case 3:
          str = Y-addZero(M)-addZero(D) addZero(h)
          break
        case 4:
          str = Y-addZero(M)-addZero(D) addZero(h):addZero(m)
          break
        case 5:
          str = Y-addZero(M)-addZero(D) addZero(h):addZero(m):addZero(s)
          break
        case 6:
          str = addZero(h):addZero(m) week[w - 1]
          break
        case 2:
        default:
          str = Y-addZero(M)-addZero(D)
      }
      break
    case 1:
      switch (precision) {
        case 0:
          str = month[(M - 1)] addZero(D)
          break
        case 2:
          str = month[(M - 1)] addZero(D), Y, 
          if (h > 12) {
            str += addZero(h - 12):addZero(m)PM
          } else {
            str += addZero(h):addZero(m)AM
          }
          break
        case 1:
        default:
          str = month[(M - 1)] addZero(D), Y
      }
      break
    default:
      str = Y-addZero(M)-addZero(D)
  }
  return str
}`}
          </pre>
        </div>
      </div>
    )
  }
}