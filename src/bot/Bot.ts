import { Context } from "./Context.js";
import { ConversationNode } from "./ConversationNode.js";
import { State } from "./State.js";

export class Bot {

  private currentState: State;
  private nodes: ConversationNode[];
  private context: Context;

  constructor(
    nodes: ConversationNode[],
    initialState: State
  ) {
    this.nodes = nodes;
    this.currentState = initialState;
    this.context = {};
  }

  getCurrentNode(): ConversationNode | undefined {

    return this.nodes.find(
      node => node.state === this.currentState
    );
  }

  processInput(input: string): string {

    const currentNode = this.getCurrentNode();

    if (!currentNode) {
      return "❌ Error: estado no encontrado.";
    }

    const transition = currentNode.transitions.find(
      transition => transition.input === input
    );

    if (!transition) {
      return "🤔 No entendí tu opción.";
    }

    if (transition.action) {
      transition.action(this.context);
    }

    this.currentState = transition.nextState;

    const nextNode = this.getCurrentNode();

    if (!nextNode) {
      return "❌ Error: siguiente estado no encontrado.";
    }

    return typeof nextNode.message === "function"
      ? nextNode.message(this.context)
      : nextNode.message;
  }

  getCurrentMessage(): string {

    const node = this.getCurrentNode();

    if (!node) {
      return "❌ Error: estado no encontrado.";
    }

    return typeof node.message === "function"
      ? node.message(this.context)
      : node.message;
  }

  setContext(key: keyof Context, value: string): void {
    this.context[key] = value;
  }

  getContext(): Context {
    return this.context;
  }
}