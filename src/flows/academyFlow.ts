import { ConversationNode } from "../bot/ConversationNode.js";

import { mainMenuFlow } from "./mainMenuFlow.js";
import { coursesFlow } from "./coursesFlow.js";
import { contactFlow } from "./contactFlow.js";

export const academyFlow: ConversationNode[] = [

  ...mainMenuFlow,
  ...coursesFlow,
  ...contactFlow

];