// import axios from 'axios';
import * as React from "react";

import { axiosRequest } from "src/assets/js/request";


export const RequestTest = class extends React.Component<any, any> {

  private dragRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.dragRef = React.createRef();

    this.state = {
      left: 0,
      offsetX: 0,
      touchX: 0,
    }
  }
  public componentDidMount() {
    console.log('componentDidMount')
    const dragRef = this.dragRef.current;
    if (!dragRef) {
      return
    }
    dragRef.addEventListener('touchstart', (event) => {
      const touchX=  event.targetTouches[0].clientX
      this.setState({
        touchX
      })
    })
    dragRef.addEventListener("touchmove", (event) => {
      const { touchX , left} = this.state
      const clientX = event.targetTouches[0].clientX
      this.setState({
        left: clientX - touchX + left,
        touchX: clientX
      })
    })
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
    const {left} = this.state
    console.log('touchX', left)
    return (
      <div className="zras-page" style={{ position: "relative"}}>
        <div
          className="wrap"
          ref={this.dragRef}
          style={{
            background: '#f00',
            height: '100px',
            left: left + 'px',
            position: "absolute",
            top: 0,
            width: '100px',
          }}
        >
          drag
        </div>
      </div>
    )
  }
}