
import { MailOutline, PhoneIphone, Room } from '@material-ui/icons';
import * as React from "react";
import { NavLink } from 'react-router-dom';
import { resume } from 'src/assets/data/resume.js';
import female from 'src/assets/images/female.svg';
import 'src/assets/styles/resume.min.css';

export const Resume = class extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = { 
    }
  }

  public render() {
    const { address, age, education, email, experience, name, phone, work } = resume
    const workStr = work.join(' / ')
    const educationStr = education.join(' / ')
    return (
      <div className="zras-resume resume-info">
        <div className="resume-logo">
          <div className="logo-img">
            <img src={require('./../assets/images/logo.png')} alt="logo" />
          </div>
          <div className="logo-border">
            <div className="logo-bottom" />
            <div className="logo-top" />
            <div className="logo-left" /> 
            <div className="logo-right" />
          </div>
        </div>
        <div className="resume-cont">
          <p className="name">{name}<img src={female} className="sex" alt="female" /></p>
          <p>{workStr}</p>
          <p>{experience}年工作经验 / {age}岁</p>
          <p>{educationStr}</p>
          <p>
            <Room /><span>{address}</span>
            <PhoneIphone /><span>{phone}</span>
            <MailOutline /><span style={{marginRight: 0}}>{email}</span>
          </p>
          <p className="collection">
            <NavLink to={'/workCollection'} className="zras-logo">
              作品集
            </NavLink >
          </p> 
        </div>
      </div>
    )
  }
}