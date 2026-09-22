import { Context } from "./Context.js";
import { State } from "./State.js";

export interface Transition {
  input: string;
  nextState: State;
  action?: (context: Context) => void;
}