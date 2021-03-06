import * as React from 'react';
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { createStore } from "redux";
import { Header } from "./components/header";
import { NoHeader } from "./components/noHeader";
import { Error } from "./pages/errorPage";
import { Home } from "./pages/home";
import { OCR } from "./pages/OCR";
import { R } from "./pages/r";
import { RequestTest } from "./pages/requestTest";
import { Resume } from "./pages/resume";
import { WorkCollection } from "./pages/workCollection";
import { rootReducer } from "./store/core.reducers";

import './assets/styles/global.min.css';

const store = createStore(rootReducer);

interface AppState {
  ready: boolean
}

interface NoHeaderType {
  page: string
  url: string
}

const noHeader: NoHeaderType[] = [
  {
    page: 'resume',
    url: '/resume'
  },
  {
    page: 'workCollection',
    url: '/resume'
  }
]

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
    const curPath = this.props.location.pathname.split('/')[1]
    let isShowHeader: boolean = true
    let pageUrl: string = ''
    for (const i in noHeader) {
      if (noHeader[i].page === curPath) {
        isShowHeader = false
        pageUrl = noHeader[i].url
      }
    }
    if (!ready) {
      return <div className="micmic">
        <div className="loading">Loading...</div>
      </div>
    }

    return (
      <Provider store={store}>
        <div className="App">
          {
            isShowHeader ? <Header /> : <NoHeader url={pageUrl} />
          }
          <Switch>
            <Redirect exact={true} path={"/"} from={"/"} to={"/home"} />
            <Route exact={true} path={"/home"} component={Home} />
            <Route exact={true} path={"/resume"} component={Resume} />
            <Route exact={true} path={"/error"} component={Error} />
            <Route exact={true} path={"/OCR"} component={OCR} />
            <Route exact={true} path={"/r"} component={R} />
            <Route exact={true} path={"/workCollection/:id?"} component={WorkCollection} />
            <Route exact={true} path={"/requestTest"} component={RequestTest} />
            <Route path={"/*"} component={Error} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
