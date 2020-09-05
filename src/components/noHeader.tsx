import * as React from "react";
import { NavLink } from 'react-router-dom';
import './../assets/styles/common.min.css';

export const NoHeader = class extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
    }
  }
  
  public render() {
    return (
      <div className="zras-noHeader">
        <div className="base">
          <span>首页</span>
        </div>
        <div className="top">
          <span>首页</span>
        </div>
        <NavLink className="link" to={'/home'}>返回首页</NavLink>
      </div>

    )
  }
}

