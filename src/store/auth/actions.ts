import { Action, ActionCreator } from "redux";
import { AuthState } from './models';

export enum AuthTypes {
  Login = "[Auth] Login",
  Logout = "[Auth] Logout",
  Update = "[Auth] Update",
}

export class AuthLoginAction implements Action {
  public readonly type = AuthTypes.Login;
  constructor(public payload: AuthState) { }
}

export class AuthLogoutAction implements Action {
  public readonly type = AuthTypes.Logout;
}

export class AuthUpdateAction implements Action {
  public readonly type = AuthTypes.Update;
  constructor(public payload: AuthState) { }
}

export const authUpdate: (param: AuthState) => AuthUpdateAction = param => ({
  payload: param,
  type: AuthTypes.Update,
});

export const authLogin: (param: AuthState) => AuthLoginAction = param => ({
  payload: param,
  type: AuthTypes.Login,
});


export const authLogout: () => AuthLogoutAction = () => ({
  type: AuthTypes.Logout
});

export const authLogout1: ActionCreator<AuthLogoutAction> = () => ({
  type: AuthTypes.Logout
});

export type AuthAction =
  | AuthLogoutAction
  | AuthLoginAction
  | AuthUpdateAction
