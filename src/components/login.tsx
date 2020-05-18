import * as React from "react";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Dict } from "../i18n";
import { mapDispatchToProps, mapStateToProps } from "./../store";

import './../assets/styles/form.min.css';

interface LoginStateType {
  password: string
  isError: boolean
}

const LoginClass = class extends React.Component<any, LoginStateType & any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isError: false,
      password: '',
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
    const target = event.currentTarget
    const { name, value } = target
    this.setState({ [name]: value });
  }

  public login = async (event: React.FormEvent<HTMLInputElement> | any) => {
    if (!event) {
      return
    }
    const attribute = event.currentTarget.getAttribute('data-name')
    if (attribute !== 'login') {
      return
    }
    this.setState({ isError: false })
    const tagName = event.currentTarget.tagName
    const { password } = this.state
    switch (tagName) {
      case 'BUTTON':
        if (password.length && password === 'zras') {
          await this.props.login({ name: 'zras', isLogging: true })
        } else {
          this.setState({ isError: true })
        }
        break
      case 'INPUT':
        if (event.which === 13 && password.length && password === 'zras') {
          await this.props.login({ name: 'zras', isLogging: true })
        } else {
          this.setState({ isError: true })
        }
        break
    }

  }

  public render() {
    const { t } = this.props
    const { password, isError } = this.state
    return (
      <div className="zras-login zras-form">
        <p className="alert-error">
          {isError ? t(Dict.PasswordError) : null}
        </p>
        <div className="row">
          <input
            name="password"
            type="password"
            onChange={this.inputChange}
            onFocus={this.inputFocus}
            value={password}
            placeholder={t(Dict.Password)}
            autoComplete="new-password"
            onKeyPress={this.login}
            data-name="login"
          />
        </div>
        <div className="row">
          <button
            className="but-base"
            onClick={this.login}
            data-name="login"
          >
            {t(Dict.Login)}
          </button>
        </div>
      </div>
    )
  }
}

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation()(
    LoginClass
  )
)