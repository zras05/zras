import * as React from "react";
import { pathToBlobBase64 } from 'src/assets/js/image';
import './../assets/styles/common.min.css';

interface ImagePropsType {
  imgsrc: string
}

const baseWidth = 1000
const baseHeight = 618
const baseScale = baseHeight / baseWidth

export const ImageWrap = class extends React.Component<ImagePropsType, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      errorMsg: '',
      imgurl: ''
    }
  }

  public async componentDidMount() {
    const { imgsrc } = this.props
    const img = await pathToBlobBase64(imgsrc)
    const { code, data } = img
    if (code) {
      this.setState({
        errorMsg: '图片错误'
      })
    }
    const { height, url, width } = data
    const scale = height / width
    let imgWidth = width
    let imgHeight = height
    if (scale > baseScale) {
      // 宽度不够
      imgWidth = height / scale
    } else {
      // 高度不够
      imgHeight = width * scale
    }
    this.setState({
      height: imgHeight,
      imgurl: url,
      width: imgWidth,
    })
  }

  public render() {
    const { imgurl,width, height } = this.state
    return (
      <div className="zras-imageWrap">
        <img src={imgurl} style={{width: `${width}px`, height: `${height}px`}} />
      </div>
    )
  }
}
