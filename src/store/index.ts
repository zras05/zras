
import { MapDispatchToProps, MapStateToPropsParam } from 'react-redux';
import { authLogin, authLogout, AuthState, authUpdate, selectAuth} from "./auth";
import { changeLanguage} from "./core.actions";
import { CoreState } from "./core.models";
import { selectLanguage} from "./core.selectors";

interface PropsDispatch {
  login: typeof authLogin;
  logout: typeof authLogout;
  updateAccount: typeof authUpdate;
  setLang: typeof changeLanguage;
};

interface MapState {
  auth: AuthState
  language: string
}

export const mapStateToProps: MapStateToPropsParam<MapState, {}, CoreState> = state => ({
  auth: selectAuth(state),
  language: selectLanguage(state)
});

export const mapDispatchToProps: MapDispatchToProps<PropsDispatch, {}> = {
  login: authLogin,
  logout: authLogout,
  setLang: changeLanguage,
  updateAccount: authUpdate,
}

