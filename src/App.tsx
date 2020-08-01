import * as React from 'react';
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { createStore } from "redux";
// import { Header } from "./components/header";
import { Error } from "./pages/errorPage";
import { Home } from "./pages/home";
import { OCR } from "./pages/OCR";
import { R } from "./pages/r";
import { Resume } from "./pages/resume";
import { WorkCollection } from "./pages/workCollection";
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
          {/* <Header /> */}
          <Switch>
            <Redirect exact={true} path={"/"} from={"/"} to={"/home"} />
            <Route exact={true} path={"/home"} component={Home} />
            <Route exact={true} path={"/resume"} component={Resume} />
            <Route exact={true} path={"/error"} component={Error} />
            <Route exact={true} path={"/OCR"} component={OCR} />
            <Route exact={true} path={"/r"} component={R} />
            <Route exact={true} path={"/workCollection/:id?"} component={WorkCollection} />
            <Route path={"/*"} component={Error} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
