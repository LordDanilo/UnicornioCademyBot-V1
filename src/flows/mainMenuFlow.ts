import { ConversationNode } from "../bot/ConversationNode.js";
import { State } from "../bot/State.js";

export const mainMenuFlow: ConversationNode[] = [

  {
    state: State.MAIN_MENU,

    message: `
🦄 ¡Bienvenido a UnicornioCAdemy!

¿Qué deseas consultar?

1️⃣ Cursos
2️⃣ Contacto
0️⃣ Salir
`,

    transitions: [
      {
        input: "1",
        nextState: State.COURSES
      },
      {
        input: "2",
        nextState: State.CONTACT
      }
    ]
  }

];