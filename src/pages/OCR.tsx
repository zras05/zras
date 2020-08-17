import * as React from "react";

export const OCR = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorWord: '',
      url: ''
    }
  }

  public inputFocus = (event: React.FormEvent<HTMLInputElement>) => {
    const attribute = event.currentTarget.getAttribute('data-name')
    const tagName = event.currentTarget.tagName
    if (attribute !== 'login' || tagName !== 'INPUT') {
      return
    }
    this.setState({ isError: false });
  }

  public inputChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      errorWord: ''
    })
    const files = event.currentTarget.files
    if (files) {
      const file = files[0]
      const { size } = file
      const maxSize = 1024 * 1024 * 4
      if (size > maxSize) {
        this.setState({
          errorWord: '文件过大'
        })
      } else {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = (e) => {
          if (e.target?.result) {
            this.setState({
              url: e.target?.result
            })
          } else {
            this.setState({
              errorWord: '图片错误'
            })
          }
        }
      }
    }
  }

  public render() {
    const { url, errorWord } = this.state
    return (
      <div>
        <p>
          <span>图片路径</span>
          <input onChange={this.inputChange} name="localUrl" type="text" />
          <input onChange={this.inputChange} name="remoteUrl" type="file" />
        </p>
        <p>{errorWord}</p>
        <p>
          <span>语言</span>
          <input type="radio" name="drone" value="huey" defaultChecked={true} />
          <label>日语</label>
        </p>
        <div>
        <div>https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597596745650&di=cb5bcd3dcc2bd035cf60d93f431432c0&imgtype=0&src=http%3A%2F%2Fimage.game.uc.cn%2F2015%2F12%2F8%2F11576324.jpg</div>
          <div className="originImg"><img src={url} /></div>
          <div className="ocrWord">ocrWord</div>
          <div className="transWord">transWord</div>
        </div>
      </div>
    )
  }
}