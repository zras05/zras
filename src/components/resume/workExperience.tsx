import * as React from "react";
import { withRouter } from 'react-router';
import { companyLogos, workExperience } from 'src/assets/data/resume.js';
import { timestampToDate } from 'src/assets/js/date';

const experience = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }
  public render() {
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
          workExperience.map(({ cid, describe, label, name, time, work }: any) => (
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
                  <img className="company-logo" src={companyLogos[cid]} alt="logo" />
                  <span>
                    <i className="name">{name}</i>
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
        }
      </div>
    )
  }
}

export const WorkExperience = withRouter(experience)