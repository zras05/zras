import BrokenImage from '@material-ui/icons/BrokenImage';
import * as React from "react";
import { pathToBlobBase64 } from 'src/assets/js/image';
import './../assets/styles/common.min.css';

interface ImagePropsType {
  imgsrc: string
}

const baseW = 1000
const baseH = 618
const baseScale = baseH / baseW

export const ImageWrap = class extends React.Component<ImagePropsType, any> {

  private imageWrapRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.imageWrapRef = React.createRef();

    this.state = {
      baseHeight: 0,
      baseWidth: 0,
      imgurl: '',
      isError: false,
    }
  }

  public async componentDidMount() {
    const current = this.imageWrapRef.current
    if (!current) {
      return
    }
    const baseWidth = current.clientWidth
    const baseHeight = Math.round(baseScale * baseWidth)
    this.setState({
      baseHeight,
      baseWidth,
    })
    const { imgsrc } = this.props
    const img = await pathToBlobBase64(imgsrc)
    const { code, data } = img
    if (code) {
      this.setState({
        isError: true
      })
      return
    }
    const { height, url, width } = data
    const scale = height / width
    let imgWidth = baseWidth
    let imgHeight = baseHeight
    if (scale > baseScale) {
      // 宽度不够
      imgWidth = baseHeight / scale
    } else {
      // 高度不够
      imgHeight = baseWidth * scale
    }
    this.setState({
      height: imgHeight,
      imgurl: url,
      isError: false,
      width: imgWidth,
    })
  }

  public render() {
    const { baseHeight, imgurl, width, height, isError } = this.state
    return (
      <div
        className="zras-imageWrap" ref={this.imageWrapRef}
        style={{ height: `${baseHeight}px` }}
      >
        {
          isError
            ? <BrokenImage />     
            : <img src={imgurl} style={{ width: `${width}px`, height: `${height}px` }} />
        }
      </div>
    )
  }
}
