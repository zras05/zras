// import axios from 'axios';
import * as React from "react";

import { axiosRequest } from "src/assets/js/request";


export const RequestTest = class extends React.Component<any> {

  constructor(props: any) {
    super(props);
    this.state = {
    }
  }
  public async componentDidMount() {
    console.log('componentDidMount')
  }

  public async getAxiosData() {
    const obj = {
      type: 'get',
      url: '/api/resume/info',
    }
    const resume = await axiosRequest(obj)
    console.log('resume', resume)
  }

  public render() {
    // this.getAxiosData()
    return (
      <div className="zras-page">RequestTest</div>
    )
  }
}