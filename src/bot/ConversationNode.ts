import { State } from "./State.js";
import { Transition } from "./Transition.js";

export interface ConversationNode {
  state: State;
  message: string | (() => string);
  transitions: Transition[];
}