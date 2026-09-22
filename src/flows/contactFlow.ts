import { ConversationNode } from "../bot/ConversationNode.js";
import { State } from "../bot/State.js";

export const contactFlow: ConversationNode[] = [

  {
    state: State.CONTACT,

    message: `
📱 Puedes contactarnos para obtener información sobre nuestros cursos.

1️⃣ Volver
`,

    transitions: [
      {
        input: "1",
        nextState: State.MAIN_MENU
      }
    ]
  }

];