import { Action, ActionCreator } from "redux";
// import { AppState } from './core.models';

export enum AppTypes {
  ChangeLanguage = "[App] changeLanguage",
}

export class ChangeLanguageAction implements Action {
  public readonly type = AppTypes.ChangeLanguage;
  constructor(public payload: string) {}
}

export const changeLanguage: ActionCreator<ChangeLanguageAction> = (param: string) =>  ({
  payload: param,
  type: AppTypes.ChangeLanguage,
});

export type AppAction =
| ChangeLanguageAction
