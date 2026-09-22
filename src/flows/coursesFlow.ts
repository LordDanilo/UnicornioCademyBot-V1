import { ConversationNode } from "../bot/ConversationNode.js";
import { Context } from "../bot/Context.js";
import { State } from "../bot/State.js";
import { courses } from "../data/courses.js";

const courseTransitions = courses.map((course, index) => ({
  input: String(index + 1),

  nextState: State.COURSE_DETAIL,

  action: (context: Context) => {
    context.selectedCourseId = course.id;
  }
}));

export const coursesFlow: ConversationNode[] = [

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
      ...courseTransitions,

      {
        input: "0",
        nextState: State.MAIN_MENU
      }
    ]
  },

  {
    state: State.COURSE_DETAIL,

    message: (context) => {

      const course = courses.find(
        course => course.id === context.selectedCourseId
      );

      if (!course) {
        return "❌ No se encontró el curso.";
      }

      return `
📚 ${course.name}

${course.description}

⏱️ Duración: ${course.duration}

1️⃣ Volver a cursos
`;
    },

    transitions: [
      {
        input: "1",
        nextState: State.COURSES
      }
    ]
  }

];