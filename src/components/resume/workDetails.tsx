import * as React from "react";
import { withRouter } from 'react-router';
import { projectLists } from 'src/assets/data/project/index.js';
import { companyLists } from 'src/assets/data/resume.js';
import { timestampToDate } from 'src/assets/js/date';
import { Carousel } from "src/components/resume/carousel"

const workDetails = class extends React.Component<any, any> {

  public static getDerivedStateFromProps(nextProps: any, currentState: any) {
    const nextid = nextProps.match.params.id
    const curProject = currentState.project
    const curid = curProject.pid
    if (nextid !== curid) {
      return {
        curid: nextid
      }
    }
    return null
  }

  constructor(props: any) {
    super(props);
    this.state = {
      curid: '',
      project: {},
    }
  }
  public componentDidMount() {
    const pid = this.props.match.params.id
    if (!pid) {
      this.props.history.push('/workCollection')
    }
    this.getProject(pid)
  }

  public componentDidUpdate(prevProps: any) {
    if (prevProps.match.params.id !== this.state.curid) {
      this.getProject(this.state.curid)
    }
  }
  public getProject(pid: string) {
    for (const i in companyLists) {
      if (companyLists[i]) {
        const item = companyLists[i].project
        for (const j in item) {
          if (item[j].pid === pid) {
            const project: any = item[j]
            project.timeStr = this.getTimes(item[j].time)
            this.setState({
              curid: pid,
              project
            })
          }
        }
      }
    }
  }

  public getTimes(time: number[]) {
    const start = timestampToDate({ timestamp: time[0], precision: 1 })
    const end = timestampToDate({ timestamp: time[1], precision: 1 })
    return `${start} - ${end}`
  }

  public render() {
    const { project } = this.state
    const { name, skills, link, functions, introduction, timeStr, pid } = project
    return (
      <div className="work-details">
        <p className="name">
          {name}
          <span className="time">{timeStr}</span>
        </p>
        {
          link ? (<p className="link"><a className="link" href={link} target="_blank">{link}</a></p>) : ''
        }
        <div className="skills">
          {
            skills ? skills.map(({ label, type }: any, index: number) => (
              <p key={index} style={type ? {} : { marginLeft: '-10px' }}>
                {
                  type ? <span className="type">{type}:</span> : ''
                }
                {
                  label ? label.map((item: string[], i: number) => (
                    <span className="label" key={i}>{item}</span>
                  )) : ''
                }
              </p>
            )) : ''
          }
        </div>
        {
          projectLists[pid] ? <Carousel imglist={projectLists[pid].imglist} /> : ''
        }
        <div className="functions">
          <p>负责功能：</p>
          {
            functions ? functions.map((item: string, index: number) => (
              <p key={index}>{item}</p>
            )) : ''
          }
        </div>
        <div className="introduction">
          <p>项目简介：</p>
          {
            introduction ? introduction.map((item: string, index: number) => (
              <p key={index}>{item}</p>
            )) : ''
          }
        </div>
      </div>
    )
  }
}

export const WorkDetails = withRouter(workDetails)