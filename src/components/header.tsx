import * as React from "react";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dict, i18n } from "../i18n";
import { mapDispatchToProps, mapStateToProps } from "./../store";
import { Logo } from "./logo";

import './../assets/styles/common.min.css';

interface ListType {
  code: string
  word: string
}

const langList: ListType[] = [
  { code: 'cn', word: '中文' },
  { code: 'en', word: 'EN' }
]

const navList: ListType[] = [
  { code: 'home', word: "Home" },
  { code: 'collection', word: 'Collection' },
  { code: 'video', word: "Video" },
  { code: 'OCR', word: "OCR" },
  { code: 'r', word: "R" },
]

const HeaderClass = class extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      curNav: 'home'
    }
  }

  public componentDidMount() {
    const { language } = this.props
    i18n.changeLanguage(language)
  }

  public setLang = async (lang: string) => {
    i18n.changeLanguage(lang)
    this.props.setLang(lang)
  };

  public setNav = (item: string) => {
    this.setState({
      curNav: item
    })
  }

  public logout = () => {
    this.props.logout()
  }

  public render() {
    const { t, language, auth } = this.props
    const { isLogging } = auth
    const { curNav } = this.state
    return (
      <header className="zras-header" >
        <div className="row">
          < NavLink to={'/'} className="zras-logo">
            <Logo />
          </NavLink >
          <ul className="zras-nav">
            {
              navList.map(({ code, word }: ListType) => (
                <li
                  key={code}
                  className={curNav === code ? 'active' : ''}
                  onClick={this.setNav.bind(this, code)}>
                  <NavLink to={`/${code}`}> {t(Dict[word])}</NavLink>
                </li>
              ))
            }
          </ul>
          <ul className="zras-language">
            {
              langList.map(({ code, word }: ListType) => (
                <li
                  key={code}
                  className={language === code ? 'active' : ''}
                  onClick={this.setLang.bind(this, code)}
                >
                  {word}
                </li>
              ))
            }
            {isLogging ? (
              <li className="logout" onClick={this.logout}>
                {t(Dict.Logout)}
              </li>
            ) : null
            }
          </ul>
        </div>
      </header >
    )
  }
}

export const Header = connect(
  mapStateToProps, mapDispatchToProps
)(
  withTranslation()(
    HeaderClass
  )
)