import * as React from "react";
import { NavLink } from 'react-router-dom';

export const ResumeLogo = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }
  public render() {
    const { link } = this.props
    return (
      <div className="resume-logo">
      <div className="logo-img">
          <img src={require('src/assets/images/logo.png')} alt="logo" />
      </div>
      <div className="logo-border">
        <div className="logo-bottom" />
        <div className="logo-top" />
        <div className="logo-left" />
        <div className="logo-right" />
      </div>
      {
        link ? (<NavLink className="logo-link" to={link} />) : ''
      }
    </div>
    )
  }
}
