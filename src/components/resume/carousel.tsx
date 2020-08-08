import * as React from "react";
const styled = require("styled-components");
import { Close } from '@material-ui/icons';


const height = 300
const totalWidth = 800

const Wrap = styled.default.div`
  width: ${totalWidth}px;
  height: ${height}px;
  overflow: hidden;
  margin-bottom: 20px;
`
const Item = styled.default.div`
  height: ${height}px;
  overflow: hidden;
  float: left;
  transition: all 1s;
  position: relative;
`
const Mask = styled.default.div`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.2);
`
const Popup = styled.default.div`
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.2);
  text-align: center;
  padding: 20vh 0;
`
const closeIconStyle = {
  color: '#ffffff',
  height: '60px',
  position: 'fixed',
  right: ' 20px',
  top: '10px',
  width: '60px'
} as React.CSSProperties;

const carouselSpanStyle = {
  background: 'rgb(0 0 0 / 0.35)',
  bottom: 0,
  color: '#fff',
  lineHeight: '28px',
  margin: 0,
  paddingLeft: '8px',
  position: 'absolute',
  width: '100%'
} as React.CSSProperties;

interface ImglistModel {
  url: string
  describe: string
}

interface Props {
  imglist: ImglistModel[]
  pid: string
}

interface States {
  curImg: string
  curIndex: number
  divWidth: number
  imgWidth: number
  pid:  string | undefined
}

export const Carousel = class extends React.Component<Props, States> {

  public static getDerivedStateFromProps(nextProps: Props, currentState: States) {
    const nextid = nextProps.pid
    const curid = currentState.pid
    if (nextid !== curid) {
      return {
        pid: nextid
      }
    }
    return null
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      curImg: '',
      curIndex: 1,
      divWidth: 0,
      imgWidth: 0,
      pid: undefined
    }
  }

  public mouseEnter = (index: number) => {
    this.setState({
      curIndex: index
    })
  }
  public imgClicked = (index: number) => {
    const { imglist } = this.props
    this.setState({
      curImg: imglist[index].url
    })
  }
  public closePopup = () => {
    this.setState({
      curImg: ''
    })
  }

  public initComp() {
    const { imglist, pid } = this.props
    const len = imglist.length
    let imgWidth = 0
    let divWidth = 0
    if (len > 3) {
      imgWidth = Math.round(totalWidth / len * 2)
      divWidth = Math.floor((totalWidth - imgWidth) / (len - 1))
    } else {
      imgWidth = totalWidth / len
      divWidth = totalWidth / len
    }
    this.setState({
      curIndex: len - 1,
      divWidth,
      imgWidth,
      pid
    })
  }
  public componentDidUpdate(prevProps: Props) {
    if (prevProps.pid !== this.state.pid) {
      this.initComp()
    }
  }
  public componentDidMount() {
    this.initComp()
  }

  public render() {
    const { imglist } = this.props
    const { imgWidth, divWidth, curIndex, curImg } = this.state
    return (
      <Wrap>
        {
          imglist
            ? imglist.map(({ url, describe }: ImglistModel, index: number) => (
              <Item
                key={index}
                onClick={this.imgClicked.bind(this, index)}
                onMouseOver={this.mouseEnter.bind(this, index)}
                style={index === curIndex ? { width: imgWidth + 'px' } : { width: divWidth + 'px' }}
              >
                <Mask style={index === curIndex ? { opacity: 0 } : { opacity: 1 }} />
                <img src={url} style={{ width: '400px' }} />
                <p style={index === curIndex ? carouselSpanStyle : { display: 'none' }}>{describe}</p>
              </Item>
            ))
            : ''
        }
        <Popup style={curImg ? { display: 'block' } : { display: 'none' }}>
          <Close
            onClick={this.closePopup.bind(this, curImg)}
            style={closeIconStyle}
          />
          <img src={curImg} style={{ width: '600px' }} />
        </Popup>
      </Wrap>
    )
  }
}