import { ConversationNode } from "../bot/ConversationNode.js";
import { State } from "../bot/State.js";
import { courses } from "../data/courses.js";

export const academyFlow: ConversationNode[] = [

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
  },

  {
    state: State.COURSES,

    message: () => {

      const courseList = courses
        .map((course, index) =>
          `${index + 1}️⃣ ${course.name}`
        )
        .join("\n");

      return `
📚 Nuestros cursos

${courseList}

0️⃣ Volver
`;
    },

    transitions: [
      {
        input: "0",
        nextState: State.MAIN_MENU
      }
    ]
  },

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