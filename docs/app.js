const courses = [
  {
    id: "java",
    name: "Programación con Java",
    description: "Aprende programación con Java desde cero.",
    duration: "40 horas"
  },

  {
    id: "typescript",
    name: "Programación con TypeScript",
    description: "Aprende TypeScript y desarrolla aplicaciones modernas.",
    duration: "30 horas"
  },

  {
    id: "angular",
    name: "Desarrollo Web con Angular",
    description: "Aprende a desarrollar aplicaciones web con Angular.",
    duration: "35 horas"
  }
];


/* =========================
   BOT STATE
========================= */

const State = {
  MAIN_MENU: "MAIN_MENU",
  COURSES: "COURSES",
  COURSE_DETAIL: "COURSE_DETAIL",
  CONTACT: "CONTACT"
};


let currentState = State.MAIN_MENU;

const context = {
  selectedCourseId: null
};


/* =========================
   DOM
========================= */

const chat = document.getElementById("chat");
const quickActions = document.getElementById("quickActions");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");


/* =========================
   UI
========================= */

function addMessage(message, type) {

  const element = document.createElement("div");

  element.classList.add(
    "message",
    type === "bot"
      ? "bot-message"
      : "user-message"
  );

  element.textContent = message;

  chat.appendChild(element);

  chat.scrollTop = chat.scrollHeight;
}


function setQuickActions(options) {

  quickActions.innerHTML = "";

  options.forEach(option => {

    const button = document.createElement("button");

    button.className = "quick-button";

    button.textContent = option.label;

    button.addEventListener("click", () => {

      processInput(option.input);

    });

    quickActions.appendChild(button);

  });
}


/* =========================
   BOT MESSAGES
========================= */

function getMainMenuMessage() {

  return `
🦄 ¡Bienvenido a UnicornioCAdemy!

¿Qué deseas consultar?

1️⃣ Cursos
2️⃣ Contacto
0️⃣ Salir
`;
}


function getCoursesMessage() {

  const courseList = courses
    .map(
      (course, index) =>
        `${index + 1}️⃣ ${course.name}`
    )
    .join("\n");

  return `
📚 Nuestros cursos

${courseList}

0️⃣ Volver
`;
}


function getCourseDetailMessage() {

  const course = courses.find(
    course =>
      course.id === context.selectedCourseId
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
}


function getContactMessage() {

  return `
📱 Puedes contactarnos para obtener información sobre nuestros cursos.

1️⃣ Volver
`;
}


/* =========================
   BOT
========================= */

function showCurrentState() {

  switch (currentState) {

    case State.MAIN_MENU:

      addMessage(
        getMainMenuMessage(),
        "bot"
      );

      setQuickActions([
        {
          input: "1",
          label: "📚 Cursos"
        },
        {
          input: "2",
          label: "📱 Contacto"
        }
      ]);

      break;


    case State.COURSES:

      addMessage(
        getCoursesMessage(),
        "bot"
      );

      setQuickActions(
        courses.map((course, index) => ({
          input: String(index + 1),
          label: course.name
        }))
      );

      break;


    case State.COURSE_DETAIL:

      addMessage(
        getCourseDetailMessage(),
        "bot"
      );

      setQuickActions([
        {
          input: "1",
          label: "↩️ Volver a cursos"
        }
      ]);

      break;


    case State.CONTACT:

      addMessage(
        getContactMessage(),
        "bot"
      );

      setQuickActions([
        {
          input: "1",
          label: "↩️ Volver"
        }
      ]);

      break;
  }
}


/* =========================
   INPUT PROCESSING
========================= */

function processInput(input) {

  input = input.trim();

  if (!input) {
    return;
  }

  addMessage(input, "user");

  switch (currentState) {

    case State.MAIN_MENU:

      if (input === "1") {

        currentState = State.COURSES;

        showCurrentState();

        return;
      }

      if (input === "2") {

        currentState = State.CONTACT;

        showCurrentState();

        return;
      }

      if (input === "0") {

        addMessage(
          "👋 ¡Hasta luego!",
          "bot"
        );

        setQuickActions([]);

        return;
      }

      break;


    case State.COURSES:

      if (input === "0") {

        currentState = State.MAIN_MENU;

        showCurrentState();

        return;
      }

      const courseIndex =
        Number(input) - 1;

      if (
        courseIndex >= 0 &&
        courseIndex < courses.length
      ) {

        context.selectedCourseId =
          courses[courseIndex].id;

        currentState =
          State.COURSE_DETAIL;

        showCurrentState();

        return;
      }

      break;


    case State.COURSE_DETAIL:

      if (input === "1") {

        currentState = State.COURSES;

        showCurrentState();

        return;
      }

      break;


    case State.CONTACT:

      if (input === "1") {

        currentState = State.MAIN_MENU;

        showCurrentState();

        return;
      }

      break;
  }


  addMessage(
    "🤔 No entendí tu opción.",
    "bot"
  );
}


/* =========================
   FORM
========================= */

messageForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    processInput(messageInput.value);

    messageInput.value = "";

    messageInput.focus();
  }
);


/* =========================
   START
========================= */

showCurrentState();
