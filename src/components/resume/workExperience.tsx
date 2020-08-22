import { BrokenImage } from '@material-ui/icons';
import * as React from "react";
import { withRouter } from 'react-router';
import { timestampToDate } from 'src/assets/js/date';
import { axiosRequest } from "src/assets/js/request";
import { companyLogos, WorkModel } from 'src/assets/js/resume';

const experience = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      workExperience: []
    }
  }

  public async componentDidMount() {
    const obj = {
      type: 'get',
      url: '/api/resume/company',
    }
    const workExperience = await axiosRequest(obj)
    if (workExperience) {
      this.setState({ workExperience })
    } else {
      console.log('Request Error')
    }
  }


  public render() {
    const { workExperience } = this.state
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
              <div className="right">
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
                <p className="label">{
                  label.map((item: string) => (
                    <span key={item}>{item}</span>
                  ))
                }</p>
                <div className="describe">
                  {
                    describe.map((item: string) => (
                      <p key={item}>{item}</p>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
            : ''
        }
      </div>
    )
  }
}

export const WorkExperience = withRouter(experience)