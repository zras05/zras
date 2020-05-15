import { Reducer } from "redux";
import { AuthAction, AuthTypes } from "./actions";
import { AuthState } from "./models";

export const auth: Reducer<AuthState, AuthAction> = (
  state = new AuthState(),
  action
) => {
  switch (action.type) {
    case AuthTypes.Login:
      return {
        ...state,
        ...action.payload
      }; 
      case AuthTypes.Logout:
        return {
          ...state,
          isLogging: false
        }; 
        case AuthTypes.Update:
          return {
            ...state,
            ...action.payload
          }; 
      default:
      return state;
  }
};
