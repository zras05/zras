import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as React from "react";

import './../assets/styles/form.min.css';

interface LangsModel {
  label: string
  value: string
}

export const langs: LangsModel[] = [
  { label: '日语', value: 'jp' },
  { label: '中文', value: 'zh' },
  { label: '繁体中文', value: 'cht' },
  { label: '英语', value: 'en' },
  { label: '法语', value: 'fra' },
  { label: '自动检测', value: 'auto' },
]

export const OCR = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorWord: '',
      radio: 'jp',
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

  public radioChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    this.setState({
      radio: target.value
    })
  }

  public render() {
    const { url, errorWord, radio } = this.state
    return (
      <div>
        <div className="zras-form zras-ocr">
          <FormControl component="div" className="row">
            <FormLabel component="label" className="label">图片路径</FormLabel>
            <input className="input-text" onChange={this.inputChange} name="localUrl" type="text" />
            <input className="input-file" onChange={this.inputChange} name="remoteUrl" type="file" />
          </FormControl>
          <p>{errorWord}</p>
          <FormControl component="div" className="row">
            <FormLabel component="label" className="label">语言</FormLabel>
            <RadioGroup className="radio-group" name="lang-type" value={radio} onChange={this.radioChange}>
              {
                langs.map(({ label, value }: LangsModel) => (
                  <FormControlLabel color="#000" key={value} value={value} control={<Radio />} label={label} />
                ))
              }
            </RadioGroup>
          </FormControl>
        </div>
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