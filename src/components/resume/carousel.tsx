import * as React from "react";
const styled = require("styled-components");
import { Close } from '@material-ui/icons';


const height = 300
const totalWidth = 800

const Wrap = styled.default.div`
  width: ${totalWidth}px;
  height: ${height}px;
  overflow: hidden;
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
const Img = styled.default.img`
  height: ${height}px;
  width: auto;
`
const Popup = styled.default.div`
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.2);
  text-align: center;
`
const Popupimg = styled.default.img`
  height: 60vh;
  width: auto;
  margin-top: 20vh;

`

export const Carousel = class extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      curImg: null,
      curIndex: 1,
      divWidth: 0,
      imgWidth: 0,
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
      curImg: imglist[index]
    })
  }
  public closePopup = () => {
    this.setState({
      curImg: null
    })
  }

  public async componentDidMount() {
    const { imglist } = this.props
    const len = imglist.length
    const img = new Image()
    img.onload = () => {
      const imgWidth = Math.round(height * img.width / img.height)
      this.setState({
        curIndex: len - 1,
        divWidth: Math.round((totalWidth - imgWidth) / (len - 1)),
        imgWidth,
      })
    }
    img.src = imglist[(len - 1)]
  }
  public render() {
    const { imglist } = this.props
    const { imgWidth, divWidth, curIndex, curImg } = this.state
    return (
      <Wrap>
        {
          imglist ? imglist.map((src: string, index: number) => (
            <Item
              key={index}
              onClick={this.imgClicked.bind(this, index)}
              onMouseOver={this.mouseEnter.bind(this, index)}
              style={index === curIndex ? { width: imgWidth + 'px' } : { width: divWidth + 'px' }}
            >
              <Mask
                style={index === curIndex ? { opacity: 0 } : { opacity: 1 }}
              />
              <Img src={src} />
            </Item>
          )) : ''
        }
        <Popup style={curImg ? { display: 'block' } : { display: 'none' }}>
          <Close
            onClick={this.closePopup.bind(this, curImg)}
            style={{
              color: '#ffffff',
              height: '60px',
              position: 'absolute',
              right: 0,
              top: 0,
              width: '60px',
            }}
          />
          <Popupimg src={curImg} />
        </Popup>
      </Wrap>
    )
  }
}