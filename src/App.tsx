import * as React from 'react';
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { createStore } from "redux";
import { Header } from "./components/header";
import { Date } from "./pages/code/date";
import { Video } from "./pages/code/video";
import { Collection } from "./pages/collection";
import { Error } from "./pages/errorPage";
import { Home } from "./pages/home";
import { OCR } from "./pages/OCR";
import { R } from "./pages/r";
import { rootReducer } from "./store/core.reducers";

import './assets/styles/global.min.css';

const store = createStore(rootReducer);

interface AppState {
  ready: boolean
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      ready: false
    }
  }

  public componentDidMount() {
    this.setState({ ready: true })
  }

  public render() {
    const { ready } = this.state
    if (!ready) {
      return <div className="micmic">
        <div className="loading">Loading...</div>
      </div>
    }

    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Switch>
            <Redirect exact={true} path={"/"} from={"/"} to={"/home"} />
            <Route exact={true} path={"/home"} component={Home} />
            <Route exact={true} path={"/error"} component={Error} />
            <Route exact={true} path={"/OCR"} component={OCR} />
            <Route exact={true} path={"/r"} component={R} />
            <Route exact={true} path={"/collection"} component={Collection} />
            <Route exact={true} path={"/collection/video"} component={Video} />
            <Route exact={true} path={"/collection/date"} component={Date} />
            <Route path={"/*"} component={Error} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
