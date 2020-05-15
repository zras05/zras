import * as React from "react";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Dict } from "../i18n";
import { mapDispatchToProps, mapStateToProps } from "./../store";

import './../assets/styles/form.min.css';

interface LoginStateType {
  password: string
}

const LoginClass = class extends React.Component<any, LoginStateType & any> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: ''
    }
  }

  public inputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    const { name, value } = target
    this.setState({ [name]: value });
  }
  public login = async () => {
    const { password } = this.state
    if (password.length) {
      await this.props.login({ name: 'zras', isLogging: true })
    }
  }

  public render() {
    const { t } = this.props
    const { password } = this.state
    return (
      <div className="zras-login zras-form">
        <div className="row">
          <input
            name="password"
            type="password"
            onChange={this.inputChange}
            value={password}
            placeholder={t(Dict.Password)}
            autoComplete="new-password"
          />
        </div>
        <div className="row">
          <button
            className="but-base"
            onClick={this.login}
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