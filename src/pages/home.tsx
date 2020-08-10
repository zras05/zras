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
        {/* <Loading /> */}
        <p>
          <NavLink to={'/resume'}>
            Resume
        </ NavLink>
        </p>
        <p>
          <NavLink to={'/requestTest'}>
            requestTest
        </ NavLink>
        </p>
      </div>
    )
  }
}