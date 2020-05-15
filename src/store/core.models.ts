import { AuthState } from "./auth";

export class CoreState {
  public auth = new AuthState();
  constructor(public language: string) {}
}
