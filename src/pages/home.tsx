import * as React from "react";
import { Loading} from "./../components/loading"

export const Home = class extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <div>
        <p>home</p>
        <Loading />
      </div>
    )
  }
}