import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as React from "react";
import { getInputBase64 } from "src/assets/js/image";
import { axiosRequest } from "src/assets/js/request";
import { ImageWrap } from 'src/components/imageWrap';

import './../assets/styles/form.min.css';
import './../assets/styles/ocr.min.css';

interface LangsModel {
  label: string
  value: string
  type: string
}
// value 翻译语言
// type  ocr语言

// 直接输入图片地址容易发生图片跨域问题

export const langs: LangsModel[] = [
  { label: '日语', value: 'jp', type: 'JAP' },
  { label: '英语', value: 'en', type: 'ENG' },
  { label: '法语', value: 'fra', type: 'FRE' },
]

export const OCR = class extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      errorWord: '',
      imgstr: '',
      imgurl: '',
      ocrResult: [],
      ocrType: '',
      transResult: [],
      transType: '',
    }
  }

  public componentDidMount() {
    this.setState({
      ocrType: 'JAP',
      transType: 'jp',
    })
  }

  public inputFocus = (event: React.FormEvent<HTMLInputElement>) => {
    const tagName = event.currentTarget.tagName
    if (tagName !== 'INPUT') {
      return
    }
    this.setState({ errorWord: '' });
  }

  public inputChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const { tagName, files } = event.currentTarget
    if (tagName !== 'INPUT') {
      return
    }
    this.setState({
      errorWord: ''
    })
    if (files) {
      const file = files[0]
      const { size } = file
      const maxSize = 1024 * 1024 * 4
      if (size > maxSize) {
        this.setState({
          errorWord: '文件过大'
        })
      } else {
        const res = await getInputBase64(file)
        if (res) {
          this.setState({
            imgstr: res,
          })
        } else {
          this.setState({
            errorWord: '图片错误'
          })
        }
      }
    } else {
      this.setState({
        errorWord: '图片错误'
      })
    }
  }

  public radioChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    this.setState({
      ocrType: target.name,
      transType: target.value,
    })
  }
  public commit = async () => {
    const { imgstr, errorWord } = this.state
    if (!imgstr) {
      this.setState({
        errorWord: '路径错误！'
      })
      return
    }
    if (errorWord) {
      return
    }
    this.setState({
      ocrResult: []
    })
    await this.getOcr()
  }

  public getOcr = async () => {
    const { ocrType, imgstr, transType } = this.state
    const obj = {
      params: {
        image: imgstr,
        ocrlang: ocrType,
        translang: transType,
      },
      type: 'post',
      url: 'api/ocr',
    }
    const axiosData = await axiosRequest(obj)
    const { code, data } = axiosData
    if (!code) {
      const ocrResult = []
      const transResult = []
      for (const i in data.trans_result) {
        if (data.trans_result[i]) {
          ocrResult.push(data.trans_result[i].src)
          transResult.push(data.trans_result[i].dst)
        }
      }
      this.setState({
        ocrResult,
        transResult
      })
    }
  }

  public getTransArray = async (ocrArray: string[]) => {
    const transResult = await ocrArray
    return transResult
  }

  public getOcrArray = (data: any) => {
    const words_result = data.words_result
    const ocrResult: string[] = []
    for (const i in words_result) {
      if (words_result[i]) {
        ocrResult.push(words_result[i].words)
      }
    }
    return ocrResult
  }

  public getOcrWithLocation = (data: any) => {
    const words_result = data.words_result
    let ocrResult: any[] = []
    for (const i in words_result) {
      if (words_result[i]) {
        ocrResult = [...ocrResult, ...words_result[i].chars]
      }
    }
    return ocrResult
  }

  public render() {
    const { imgstr, errorWord, transType, ocrType, ocrResult, transResult } = this.state
    return (
      <div className="zras-page zras-ocr">
        <div className="zras-form">
          <FormControl component="div" className="row">
            <FormLabel component="label" className="label">图片路径</FormLabel>
            {/* 输入路径
             <input
              className="input-text"
              onChange={this.inputChange} name="localUrl" type="text"
              value={imgurl}
            /> */}
            <input className="input-file" onChange={this.inputChange} name="remoteUrl" type="file" />
            <p>仅支持jpg或png格式图片</p>
            <p>{errorWord}</p>
          </FormControl>
          <FormControl component="div" className="row">
            <FormLabel component="label" className="label">语言</FormLabel>
            <RadioGroup
              className="radio-group" name="lang-type"
              value={transType} ocr-value={ocrType}
              onChange={this.radioChange}
            >
              {
                langs.map(({ label, value, type }: LangsModel) => (
                  <FormControlLabel
                    color="#000" key={value} value={value} name={type}
                    control={<Radio />}
                    label={label}
                  />
                ))
              }
            </RadioGroup>
          </FormControl>
          <div className="row">
            <button
              className="but-base commit"
              onClick={this.commit}
            >
              提交
          </button>
          </div>
        </div>
        <div className="ocr-result">
          <div className="origin-img">{
            imgstr ? <ImageWrap imgsrc={imgstr} /> : null
          }</div>
          {/* 显示 ocr 位置
           <div className="ocr-word">{
            ocrResult ? ocrResult.map(({ char, location }: any, index: string) => (
              <span style={location} key={index}>{char}</span>
            )) : null
          }</div> */}
          {
            ocrResult.length
              ? <div className="ocr-word">
                <p className="word-title">原文： </p>
                {
                  ocrResult.map((item: string, index: string) => (
                    <p key={index}>{item}</p>
                  ))
                }</div>
              : null
          }
          {
            transResult.length
              ? <div className="trans-word">
                <p className="word-title">翻译： </p>
                {
                  transResult.map((item: string, index: string) => (
                    <p key={index}>{item}</p>
                  ))
                }</div>
              : null
          }


        </div>
      </div>
    )
  }
}