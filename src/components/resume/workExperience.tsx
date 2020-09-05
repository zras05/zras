import { BrokenImage } from '@material-ui/icons';
import * as React from "react";
import { withRouter } from 'react-router';
import { timestampToDate } from 'src/assets/js/date';
import { axiosRequest } from "src/assets/js/request";
import { companyLogos, WorkModel } from 'src/assets/js/resume';
import { Paging } from 'src/components/resume/paging';

const GetTime = (time: number[] | any) => {
  if (!time) {
    return (
      <p />
    )
  }
  const arr = time.time
  if (!arr || !arr.length) {
    return (
      <p />
    )
  }
  const start = timestampToDate(
    { timestamp: arr[0], precision: 1 }
  )
  const end = timestampToDate(
    { timestamp: arr[1], precision: 1 }
  )
  return (
    <p className="time-wrap">{start} - {end}</p>
  )
}

const Company = ({ name, cdata }: { name: string, cdata: WorkModel | any }) => {
  const { cid, describe, label, company, work } = cdata
  const newname = `company-wrap ${name}`
  return (
    <div className={newname}>
      <p className="company">
        {
          (companyLogos && companyLogos[cid])
            ? <img className="company-logo" src={companyLogos[cid]} alt="logo" />
            : <BrokenImage />
        }
        <span>
          <i className="name">{company}</i>
          <i className="work">{work}</i>
        </span>
      </p>
      <p className="title">使用技能</p>
      <p className="label">{
        label.map((item: string) => (
          <span key={item}>{item}</span>
        ))
      }</p>
      <p className="title">负责功能</p>
      <div className="describe">
        {
          describe.map((item: string) => (
            <p key={item}>{item}</p>
          ))
        }
      </div>
    </div>
  )
}

const baseX = 30
const baseW = 120
const mp = 40

const experience = class extends React.Component<any, any> {

  private dragRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.dragRef = React.createRef();
    this.state = {
      count: 0,
      curId: '',
      curTime: [],
      curnum: 0,
      dragX: baseX,
      touchX: 0,
      workExperience: [],
    }
  }

  public async componentDidMount() {
    const obj = {
      type: 'get',
      url: '/api/resume/company',
    }
    const workExperience = await axiosRequest(obj)
    if (workExperience) {
      const count = workExperience.length
      const curnum = Math.ceil(count / 2)
      const curItem = workExperience[(curnum - 1)]
      const newDrag = this.countDragX(curnum)
      this.setState({
        count,
        curId: curItem.cid,
        curTime: curItem.time,
        curnum,
        dragX: newDrag,
        workExperience,
      })
      this.drag()
    } else {
      console.log('Request Error')
    }
  }

  public drag = () => {
    const dragRef = this.dragRef.current;
    if (!dragRef) {
      return
    }
    dragRef.addEventListener('touchstart', (event) => {
      const touchX = event.targetTouches[0].clientX
      this.setState({
        touchX
      })
    })
    dragRef.addEventListener("touchmove", (event) => {
      const { touchX, dragX, count,workExperience } = this.state
      const clientX = event.targetTouches[0].clientX
      let newX = clientX - touchX + dragX
      let curnum = 1
      const bodyW = document.body.clientWidth
      const cardW = bodyW - baseW
      const totalW = (count - 1) * (baseW - bodyW) - mp
      if (newX < totalW) {
        newX = totalW
        curnum = count
      } else if (newX > baseX) {
        newX = baseX
        curnum = 1
      } else {
        curnum = Math.ceil(newX / cardW * -1)
        if (curnum < 1) {
          curnum = 1
        }
      }
      const curItem = workExperience[(curnum - 1)]
      const curTime= curItem.time
      this.setState({
        curTime,
        curnum,
        dragX: newX,
        touchX: clientX
      })
    })
  }

  public countDragX = (count: number) => {
    const bodyW = document.body.clientWidth
    if (count === 1) {
      return baseX
    } else {
      const num = (count - 1) * (bodyW - baseW) + (count - 2) * mp
      return num * -1
    }

  }

  public render() {
    const { dragX, workExperience, count, curnum, curTime } = this.state
    return (
      <div className="work-experience">
        <div className="item">
          <div className="left">
            <p className="time">
              {timestampToDate({ timestamp: 1593532800000, precision: 1 })}
            </p>
          </div>
          <div className="center">
            <span><i /></span>
          </div>
          <div className="right">
            <p className="company" style={{ paddingTop: '8px' }}>
              <span>
                <i className="name">至今</i>
              </span>
            </p>
          </div>
        </div>
        {
          workExperience.length ? workExperience.map(({ cid, describe, label, company, time, work }: WorkModel) => (
            <div className="item" key={cid}>
              <div className="left">
                <p className="time">
                  {timestampToDate({ timestamp: time[0], precision: 1 })}
                </p>
              </div>
              <div className="center">
                <span><i /></span>
              </div>
              <Company name="right" cdata={{ cid, describe, label, company, time, work }} />
            </div>
          ))
            : ''
        }
        <div className="mobile-item">
          <div className="drap-wrap">
            <div className="card-wrap"
              ref={this.dragRef}
              style={{ left: dragX + 'px' }}
            >
              {
                workExperience.length ? workExperience.map(({ cid, describe, label, company, time, work }: WorkModel) => (
                  <Company name="card" key={cid} cdata={{ cid, describe, label, company, time, work }} />
                )) : null
              }
            </div>
          </div>
          <GetTime time={curTime} />
          <div className="page-wrap">
            <Paging count={count} page={curnum} />
          </div>
        </div>
      </div>
    )
  }
}

export const WorkExperience = withRouter(experience)