import { State } from "./State.js";

export interface Transition {
  input: string;
  nextState: State;
}