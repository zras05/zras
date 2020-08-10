import * as React from "react";
import { withRouter } from 'react-router';
import { ProjectModel, SkillModel } from 'src/assets/data/models';
import { projectLists } from 'src/assets/data/projects';
import { axiosRequest } from "src/assets/data/request";
// import { companyLists } from 'src/assets/data/resume';
import { timestampToDate } from 'src/assets/js/date';
import { Carousel } from "src/components/resume/carousel";

interface States {
  curid: string
  project: ProjectModel
}

const workDetails = class extends React.Component<any, States> {

  public static getDerivedStateFromProps(nextProps: any, currentState: States) {
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
      project: {
        functions: [],
        introduction: [],
        name: '',
        pid: '',
        skills: [],
        time: []
      }
    }
  }

  public componentDidMount() {
    const pid = this.props.match.params.id
    if (!pid) {
      this.props.history.push('/workCollection')
    }
    this.getProject(pid)
  }

  public async componentDidUpdate(prevProps: any) {
    if (prevProps.match.params.id !== this.state.curid) {
      await this.getProject(this.state.curid)
    }
  }
  public async getProject(pid: string) {
    const obj = {
      type: 'get',
      url: '/api/resume/project/' + pid,
    }
    const project = await axiosRequest(obj)
    if (project) {
      project.timeStr = this.getTimes(project.time)
      this.setState({ curid: pid, project })
    } else {
      console.log('Request Error')
    }
  }

  public getTimes(time: number[]) {
    const start = timestampToDate({ timestamp: time[0], precision: 1 })
    const end = timestampToDate({ timestamp: time[1], precision: 1 })
    return `${start} - ${end}`
  }

  public render() {
    const { project } = this.state
    const { name, skills, link, functions, introduction, timeStr, pid }: ProjectModel = project
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
            skills ? skills.map(({ label, type }: SkillModel, index: number) => (
              <p key={index} style={type ? {} : { marginLeft: '-10px' }}>
                {
                  type ? <span className="type">{type}:</span> : ''
                }
                {
                  label ? label.map((item: string, i: number) => (
                    <span className="label" key={i}>{item}</span>
                  )) : ''
                }
              </p>
            )) : ''
          }
        </div>
        {
          projectLists[pid]
            ? <Carousel imglist={projectLists[pid].imglist} pid={pid} />
            : ''
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