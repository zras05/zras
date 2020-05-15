import { combineReducers, Reducer } from "redux";
import { auth } from "./auth";
import { config } from './config'
import { AppAction, AppTypes } from './core.actions'
import { CoreState } from "./core.models";

export const rootReducer: Reducer<CoreState> = combineReducers({
  auth,
  language: (state: string = config.language, action: AppAction) => {
    switch (action.type) {
      case AppTypes.ChangeLanguage:
        return action.payload
      default:
        return state;
    }
  }
});