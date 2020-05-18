import * as React from "react";
import { connect } from 'react-redux';
import { Login } from './../components/login';
import { mapDispatchToProps, mapStateToProps } from "./../store";

const RClass  = class extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public render() {
    const { auth } = this.props
    const { isLogging } = auth
    if (!isLogging) {
      return (
        <div className="zras-page">
          <Login />
        </div>
      )
    }
    return (
      <div className="zras-page">
        <p>R</p>
      </div>
    )
  }
}

export const R = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  RClass
)