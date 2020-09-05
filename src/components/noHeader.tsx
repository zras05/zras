import * as React from "react";
import { NavLink } from 'react-router-dom';
import './../assets/styles/common.min.css';


interface Props {
  url: string
}

export const NoHeader = class extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  public render() {
    const { url } = this.props
    return (
      <div className="zras-noHeader">
        <div className="base">
          <span>首页</span>
        </div>
        <div className="top">
          <span>首页</span>
        </div>
        <NavLink className="link" to={url}>返回首页</NavLink>
      </div>

    )
  }
}

