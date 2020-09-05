import * as React from "react";
import { NavLink } from 'react-router-dom'
// import { Loading} from "./../components/loading"

export const Home = class extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <div className="zras-page zras-home">
        <p>
          <NavLink to={'/resume'}>
            简历
        </ NavLink>
        </p>
        <p>
          <NavLink to={'/requestTest'}>
            测试
        </ NavLink>
        </p>
      </div>
    )
  }
}