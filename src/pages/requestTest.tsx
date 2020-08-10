import axios from 'axios';
import * as React from "react";

export const RequestTest = class extends React.Component<any> {

  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public getResumeInfo() {
    // axios.get('api/resume/info')
    //   .then((response) => {
    //     console.log('response', response);
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });

    axios.get('/api')
      .then((response) => {
        console.log('response', response);
      })
  }

  public render() {
    this.getResumeInfo()
    return (
      <div className="zras-page">RequestTest</div>
    )
  }
}