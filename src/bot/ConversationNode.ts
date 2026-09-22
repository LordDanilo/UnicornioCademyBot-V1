import { Context } from "./Context.js";
import { State } from "./State.js";
import { Transition } from "./Transition.js";

export interface ConversationNode {
  state: State;
  message: string | ((context: Context) => string);
  transitions: Transition[];
}