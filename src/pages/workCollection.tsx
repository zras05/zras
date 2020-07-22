import * as React from "react";
import 'src/assets/styles/resume.min.css';

export const WorkCollection = class extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public render() { 
    return (
      <div className="zras-resume resume-workCollection">
       <div className="resume-left">left</div>
        <div className="resume-right">right</div>
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
      </div>
    )
  }
}