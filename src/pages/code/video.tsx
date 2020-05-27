import * as React from "react";
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from "../../store";

require('./../../assets/js/tracking/tracking-min')
require('./../../assets/js/tracking/face/face-min')

import './../../assets/styles/video.min.css';

declare global {
  interface Window { tracking: any; }
}

export const VideoClass = class extends React.Component<any & Window, any> {

  private videoRef: React.RefObject<HTMLVideoElement>;
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private trackingRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.trackingRef = React.createRef();

    this.state = {
      barWidth: 0,
      canvasHeight: 0,
      canvasLeft: 0,
      canvasTop: 0,
      canvasWidth: 0,
      cutImgScale: 1,
      imgList: [],
      isClose: true,
      isHover: false,
      isPlaying: false,
      originData: '',
      originFile: '',
      selectedImg: '',
      timeInterval: null,
      tracker: null,
      trackerTask: null,
      videoHeight: 254,
      videoWidth: 464,
    }
  }

  public initTracking = () => {
    this.domValidation()
    const validation = this.domValidation()
    if (!validation) {
      return
    }
    const { imgCanvasRef, imgContext, videoRef } = validation
    let { tracker, trackerTask } = this.state
    if (!tracker) {
      tracker = new window.tracking.ObjectTracker('face')
      tracker.setInitialScale(1);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
    }
    videoRef.addEventListener('canplay', async () => {
      const { videoHeight, videoWidth } = this.state
      const imgScale = videoRef.videoWidth / videoRef.videoHeight
      const videoScale = videoWidth / videoHeight
      if (imgScale > videoScale) {
        const canvasHeight = videoWidth / imgScale
        const canvasTop = (videoHeight - canvasHeight) / 2
        this.setState({
          canvasHeight,
          canvasLeft: 0,
          canvasTop,
          canvasWidth: videoWidth,
          cutImgScale: imgScale,
        })
      } else {
        const canvasWidth = videoHeight * imgScale
        const canvasLeft = (videoWidth - canvasWidth) / 2
        this.setState({
          canvasHeight: videoHeight,
          canvasLeft,
          canvasTop: 0,
          canvasWidth,
          cutImgScale: imgScale,
        })
      }
      trackerTask = window.tracking.track(videoRef, tracker, { camera: false });
      tracker.on('track', (event: any) => {
        const { canvasWidth, canvasHeight } = this.state
        imgContext.drawImage(videoRef, 0, 0, canvasWidth, canvasHeight);
        const baseUrl = imgCanvasRef.toDataURL("image/png")
        this.cutImg(baseUrl, event.data)
        imgContext.strokeStyle = '#445793';
        imgContext.clearRect(0, 0, canvasWidth, canvasHeight);
        event.data.forEach((rect: any) => {
          imgContext.strokeRect(rect.x, rect.y, rect.width, rect.height);
        });
      });
      trackerTask.stop()
      this.setState({ tracker, trackerTask })
    });
    videoRef.addEventListener('ended', () => {
      const { timeInterval } = this.state
      window.clearInterval(timeInterval)
      this.setState({
        isPlaying: false,
        timeInterval: null
      })
      videoRef.pause()
      trackerTask.stop()
    });
  }

  public changeTime = (event: any) => {
    const { trackerTask } = this.state
    const validation = this.domValidation()
    if (!validation || !trackerTask) {
      return
    }
    const { trackingRef, videoRef } = validation
    const className = event.target.className.split('-')
    for (const i in className) {
      if (className[i] === 'progress') {
        const targetL = event.target.offsetLeft
        const eventX = event.pageX
        const videoL = trackingRef.offsetLeft
        const barWidth = eventX - videoL - targetL
        this.setState({ barWidth })
        const { videoWidth } = this.state
        videoRef.currentTime = barWidth / (videoWidth - 40) * videoRef.duration
        trackerTask.run()
        setTimeout(() => {
          trackerTask.stop()
        }, 100);
        return
      }
    }
  }

  public cutImg = (urlStr: string, data: any[]) => {
    if (!data.length) {
      return
    }
    const { canvasWidth, canvasHeight } = this.state
    const newimg = new Image()
    newimg.src = urlStr
    newimg.onload = () => {
      const can = document.createElement("canvas")
      if (!can || !can.getContext) {
        return
      }
      const cxt = can.getContext('2d');
      if (!cxt) {
        return
      }
      data.map((rect: any) => {
        can.width = rect.width
        can.height = rect.height
        cxt.clearRect(0, 0, canvasWidth, canvasHeight);
        cxt.drawImage(newimg, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height); // 一定要写在onload回调中，否则看不到图片
        const imgData = cxt.getImageData(0, 0, rect.width, rect.height).data;
        const length = imgData.length / 4
        let count = 0
        for (let i = 0; i < length; i++) {
          const r = data[i * 4]
          const g = data[i * 4 + 1]
          const b = data[i * 4 + 2]
          if ((r > 250 && g > 250 && b > 250) || (r < 5 && g < 5 && b < 5)) {
            count++
          }
        }
        if (count / length * 100 > 50) {
          return
        } else {
          const { imgList } = this.state
          imgList.unshift({
            active: 'blur',
            state: 'data',
            url: can.toDataURL("image/png"),
          })
          if (imgList.length > 5) {
            imgList.pop()
          }
          this.setState({ imgList })
        }
      })
    }
  }

  public progressInterval = () => {
    const validation = this.domValidation()
    if (!validation) {
      return
    }
    const { videoRef } = validation
    const { videoWidth } = this.state
    if (videoRef.currentTime >= videoRef.duration) {
      this.setState({ barWidth: videoWidth - 40 })
      return
    }
    const barWidth = videoRef.currentTime / videoRef.duration * (videoWidth - 40)
    this.setState({ barWidth })
  }

  public inputFile = (event: React.FormEvent<HTMLInputElement>) => {
    const fileList = event.currentTarget.files;
    if (!fileList) {
      this.inputClicked(event)
      return
    }
    const file = fileList[0];
    const type = file.type.split('/')[0]
    if (type !== 'video') {
      this.inputClicked(event)
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e: any) => {
      this.setState({
        isPlaying: false,
        originData: e.target.result,
        originFile: file,
      }, async () => {
        await this.initTracking()
      })
    }
  }

  public inputClicked = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = ''
  }

  public enterLeaveVideo = (state: boolean, event: any) => {
    this.setState({ isHover: state })
  }

  public playPauseVideo = () => {
    const validation = this.domValidation()
    const { trackerTask } = this.state
    if (!validation || !trackerTask) {
      return
    }
    const { videoRef } = validation
    const { isPlaying } = this.state
    if (isPlaying) {
      this.setState({
        isPlaying: false
      })
      videoRef.pause()
      trackerTask.stop()
      const { timeInterval } = this.state
      window.clearInterval(timeInterval)
      this.setState({
        timeInterval: null
      })
    } else {
      this.setState({
        isPlaying: true
      })
      videoRef.play()
      trackerTask.run()
      this.setState({
        timeInterval: setInterval(this.progressInterval, 100)
      })
    }
  }

  public domValidation = () => {
    const imgCanvasRef = this.canvasRef.current;
    if (!imgCanvasRef || !imgCanvasRef.getContext) {
      return false
    }
    const imgContext = imgCanvasRef.getContext('2d')
    if (!imgContext) {
      return false
    }
    const videoRef = this.videoRef.current;
    if (!videoRef) {
      return false
    }
    const trackingRef = this.trackingRef.current;
    if (!trackingRef) {
      return false
    }
    return { videoRef, imgCanvasRef, imgContext, trackingRef }
  }

  public selectedImg = (index: number, src: string) => {
    const { imgList } = this.state
    imgList.map((item: any) => {
      if (item.state === 'data') {
        item.active = 'blur'
      }
    })
    imgList[index].active = 'active'
    this.setState({ imgList, selectedImg: src })
  }

  public clearVideo = () => {
    const { timeInterval } = this.state
    window.clearInterval(timeInterval)
    this.setState({
      barWidth: 0,
      imgList: [],
      isPlaying: false,
      originData: '',
      originFile: '',
      timeInterval: null,
    })
    const validation = this.domValidation()
    const { trackerTask } = this.state
    if (validation && trackerTask) {
      const { imgContext, videoRef } = validation
      const { canvasWidth, canvasHeight } = this.state
      imgContext.clearRect(0, 0, canvasWidth, canvasHeight);
      imgContext.clearRect(0, 0, canvasWidth, canvasHeight);
      videoRef.pause()
      trackerTask.stop()
    }
  }

  public componentWillUnmount() {
    const { timeInterval } = this.state
    if (timeInterval) {
      window.clearInterval(timeInterval)
    }

  }

  public render() {
    const {
      originFile, originData, barWidth, imgList,
      isHover, isClose, isPlaying,
      canvasHeight, canvasLeft, canvasTop, canvasWidth
    } = this.state
    return (
      <div className="zras-page zras-video">
        {
          !originFile ? (
            <div className="upload">
              <img
                className="addimg"
                src={require('./../../assets/images/upload.png')} alt="upload"
              />
              <input
                type="file"
                onClick={this.inputClicked}
                onChange={this.inputFile}
                className="addinput"
              />
            </div>
          ) : (
              <div className="tracking" ref={this.trackingRef}>
                <div className="video">
                  <video ref={this.videoRef} src={originData}>No Support!</video>
                </div>
                <canvas className="canvas"
                  width={`${canvasWidth}px`}
                  height={`${canvasHeight}px`}
                  style={{ left: `${canvasLeft}px`, top: `${canvasTop}px` }}
                  ref={this.canvasRef} />
                <div className="control"
                  onMouseEnter={this.enterLeaveVideo.bind(this, true)}
                  onMouseLeave={this.enterLeaveVideo.bind(this, false)}
                  onClick={this.playPauseVideo}>
                  {
                    isHover ? (
                      isClose ? (
                        <img
                          className="close"
                          src={require('./../../assets/images/close.png')}
                          alt="close"
                          onClick={this.clearVideo}
                        />
                      ) : null

                    ) : null
                  }
                  {
                    isHover ? (
                      isPlaying ? (
                        <img
                          className="play-pause"
                          src={require('./../../assets/images/pause.png')}
                          alt="playpause"
                        />
                      ) : (
                          <img
                            className="play-pause"
                            src={require('./../../assets/images/play.png')}
                            alt="playpause"
                          />
                        )
                    ) : null
                  }
                </div>
                <div className="progress">
                  <div className="progress-bg" onClick={this.changeTime} />
                  <div className="slider" style={{ left: `${barWidth + 18}px` }} />
                  <div
                    className="progress-bar"
                    onClick={this.changeTime}
                    style={{ width: `${barWidth}px` }}
                  />
                </div>
                <ul className="cut-list">
                  {
                    imgList ? imgList.map(({ active, url, state }: any, index: number) => {
                      return (
                        <li
                          className={active} key={index}
                          onClick={state === 'nodata' ? (() => { return }) :
                            this.selectedImg.bind(this, index, url)}
                        >
                          <img src={url} />
                        </li>
                      )
                    }) : null
                  }
                </ul>
              </div>
            )
        }
        <div className="code">
          <p className="title">一、{`<video> `} 仅支持：</p>
          <p>MP4: MPEG 4文件使用 H264 视频编解码器和AAC音频编解码器</p>
          <p>WebM: WebM 文件使用 VP8 视频编解码器和 Vorbis 音频编解码器</p>
          <p>Ogg: Ogg 文件使用 Theora 视频编解码器和 Vorbis音频编解码器</p>
          <p />
          <p className="title">二、非同一域名视频源污染（"Access-Control-Allow-Origin: *"）</p>
          <pre>
            {`const xhr = new XMLHttpRequest();
xhr.onload = (res: any) => {
  const response = res.currentTarget.response
  const reader = new FileReader();
  reader.readAsDataURL(response);
  reader.onloadend = (e: any) => {
    // e.target.result 
  }
};
xhr.open('GET', '视频地址', true);
xhr.responseType = 'blob';
xhr.send();`}
          </pre>
          <p className="title">
            三、视频人脸追踪
            <a href="https://trackingjs.com" target="_blank">tracking.js</a>
          </p>
          <pre>
{`require('tracking-min')
require('face-min')

declare global {
  interface Window { tracking: any; }
}

export const VideoClass = class extends React.Component<any & Window, any> {
  private videoRef: React.RefObject<HTMLVideoElement>;
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  constructor(props: any) {
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }
}`}
          </pre>
          <pre>
{`initTracking = () => {
  const tracker = new window.tracking.ObjectTracker('face')
  tracker.setInitialScale(1);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  videoRef.addEventListener('canplay', async () => {
    trackerTask = window.tracking.track(videoRef, tracker, { camera: false });
    tracker.on('track', (event: any) => {
      // 追踪视频
    });
    trackerTask.stop()
  });
  videoRef.addEventListener('ended', () => {
    videoRef.pause()
    trackerTask.stop()
  });
}
`}
          </pre>
        </div>
      </div>
    )
  }

}

export const Video = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  VideoClass
)