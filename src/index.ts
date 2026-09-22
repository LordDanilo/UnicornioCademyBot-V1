import readline from "node:readline";

import { Bot } from "./bot/Bot.js";
import { State } from "./bot/State.js";
import { academyFlow } from "./flows/academyFlow.js";

const bot = new Bot(
  academyFlow,
  State.MAIN_MENU
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(bot.getCurrentMessage());

function askQuestion(): void {

  rl.question("👤 Tú: ", (input) => {

    if (input === "0") {
      console.log("🤖 Bot: 👋 ¡Hasta luego!");
      rl.close();
      return;
    }

    const response = bot.processInput(input);

    console.log(`🤖 Bot: ${response}`);

    askQuestion();
  });
}

askQuestion();