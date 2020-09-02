import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from "react";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getInputBase64 } from "src/assets/js/image";
import { axiosRequest } from "src/assets/js/request";
import { ImageWrap } from 'src/components/imageWrap';
import { Dict } from "../i18n";
import { mapDispatchToProps, mapStateToProps } from "./../store";

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
  { label: '日语(JP)', value: 'jp', type: 'JAP' },
  { label: '英语(EN)', value: 'en', type: 'ENG' },
  { label: '法语(FR)', value: 'fra', type: 'FRE' },
]

const OCRClass = class extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      errorWord: '',
      fileName: '',
      imgstr: '',
      imgurl: '',
      isCommit: false,
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
    const { t } = this.props
    if (files) {
      const file = files[0]
      const { size, name } = file
      const maxSize = 1024 * 1024 * 4
      if (size > maxSize) {
        this.setState({
          errorWord: t(Dict.BigFile)
        })
      } else {
        const res = await getInputBase64(file)
        if (res) {
          this.setState({
            fileName: name,
            imgstr: res,
          })
        } else {
          this.setState({
            errorWord: t(Dict.PictureError)
          })
        }
      }
    } else {
      this.setState({
        errorWord: t(Dict.PictureError)
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
    const { t } = this.props
    const { isCommit } = this.state
    if (isCommit) {
      return
    }
    const { imgstr, errorWord } = this.state
    if (!imgstr) {
      this.setState({
        errorWord: t(Dict.PathError)
      })
      return
    }
    if (errorWord) {
      return
    }
    this.setState({
      isCommit: true,
      ocrResult: [],
      transResult: []
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
    if (axiosData) {
      const ocrResult = []
      const transResult = []
      const result = axiosData.trans_result
      for (const i in result) {
        if (result[i]) {
          ocrResult.push(result[i].src)
          transResult.push(result[i].dst)
        }
      }
      this.setState({
        isCommit: false,
        ocrResult,
        transResult
      })
    } else {
      const { t } = this.props
      this.setState({
        errorWord: t(Dict.RequestError),
        isCommit: false,
      })
    }
  }

  public clear = () => {
    this.setState({
      fileName: '',
      imgstr: '',
      ocrResult: [],
      transResult: []
    })
  }

  public render() {
    const { t } = this.props
    const { imgstr, errorWord, transType, ocrType, ocrResult, transResult, fileName, isCommit } = this.state
    return (
      <div className="zras-page zras-ocr">
        <div className="ocr-condition">
          <div className="zras-form">
            <FormControl component="div" className="row input-wrap">
              <FormLabel component="label" className="label">{t(Dict.Path)}</FormLabel>
              {
                fileName
                  ? <p>
                    <span>{fileName}</span>
                    <button className="but-base clear" onClick={this.clear}><ClearIcon /></button>
                  </p>
                  : <p>
                    {/* 输入路径
                      <input className="input-text" onChange={this.inputChange} 
                      name="localUrl" type="text" value={imgurl} /> 
                    */}
                    <button className="but-base select">{t(Dict.Select)}</button>
                    <input className="input-file" onChange={this.inputChange} name="remoteUrl" type="file" />
                    <span className="condition">{t(Dict.Condition)}</span>
                  </p>
              }
            </FormControl>
            <FormControl component="div" className="row">
              <FormLabel component="label" className="label">{t(Dict.Language)}</FormLabel>
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
            <div className="row error-wrap">
              <label className="label" />
              {
                errorWord
                  ? <span className="alert-error">{errorWord}</span>
                  : null
              }
            </div>
            <div className="row button-wrap">
              <label className="label" />
              <button className={isCommit ? 'commit' : 'but-base commit'} onClick={this.commit}>{t(Dict.Submit)}</button>
            </div>
          </div>
          <div className="ocr-image">
            {
              imgstr ? <ImageWrap imgsrc={imgstr} /> : null
            }
          </div>
        </div>
        <div className="ocr-result">
          {/* 显示 ocr 位置
           <div className="ocr-word">{
            ocrResult ? ocrResult.map(({ char, location }: any, index: string) => (
              <span style={location} key={index}>{char}</span>
            )) : null
          }</div> */}
          {
            ocrResult.length
              ? <div className="ocr-word">
                <p className="word-title">{t(Dict.Original)}</p>
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
                <p className="word-title">{t(Dict.Translate)}</p>
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

export const OCR = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation()(
    OCRClass
  )
)