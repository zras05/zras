import { MailOutline, PhoneIphone, Room } from '@material-ui/icons';
import * as React from "react";
import { NavLink } from 'react-router-dom';
import female from 'src/assets/images/female.svg';
import { axiosRequest } from "src/assets/js/request";
import { ResumeInfoModel } from "src/assets/js/resume";
import { ResumeLogo } from 'src/components/resume/resumeLogo';

import 'src/assets/styles/resume.min.css';

export const Resume = class extends React.Component<any, any & ResumeInfoModel> {

  constructor(props: any) {
    super(props);
    this.state = {
      resume: {
        address: "",
        age: 0,
        education: [],
        email: "",
        experience: 0,
        name: "",
        phone: "",
        work: []
      }
    }
  }

  public async componentDidMount() {
    const obj = {
      type: 'get',
      url: '/api/resume/info',
    }
    const resume = await axiosRequest(obj)
    if (resume) {
      this.setState({ resume })
    } else {
      console.log('Request Error')
    }
  }

  public render() {
    const { resume } = this.state
    const { address, age, education, email, experience, name, phone, work }:ResumeInfoModel = resume
    const workStr = work.length ? work.join(' / ') : ''
    const educationStr = education.length ? education.join(' / ') : ''
    return (
      <div className="zras-resume resume-info">
        <ResumeLogo />
        <div className="resume-cont">
          <p className="name">{name}<img src={female} className="sex" alt="female" /></p>
          <p>{workStr}</p>
          <p>{experience}年工作经验 / {age}岁</p>
          <p>{educationStr}</p>
          <p>
            <Room /><span>{address}</span>
            <PhoneIphone /><span>{phone}</span>
            <MailOutline /><span style={{ marginRight: 0 }}>{email}</span>
          </p>
          <p className="toCollection">
            <NavLink to={'/workCollection'}>
              作品集
            </NavLink >
          </p>
        </div>
      </div>
    )
  }
}