import axios from 'axios';
import * as React from "react";

export const RequestTest = class extends React.Component<any> {

  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public getResumeInfo() {
    axios.get('api/resume/info')
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  public render() {
    this.getResumeInfo()
    return (
      <div className="zras-page">RequestTest</div>
    )
  }
}