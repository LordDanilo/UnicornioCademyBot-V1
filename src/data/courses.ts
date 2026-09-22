export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
}

export const courses: Course[] = [
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