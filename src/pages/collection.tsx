import * as React from "react";

export const Collection = class extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <div className="zras-collection">
        <div className="row">
          <p className="title">Date</p>
        </div>
      </div>
    )
  }
}