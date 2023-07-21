import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  //first, we want to greet the user
  console.log(colors.bold.green("Welcome to the Chatbot program!"));
  console.log(colors.bold.green("you can start chatting with the bot"));

  const chatHistory = []; //store converstaion history

  //we are going to have a constatn converstaion
  while (true) {
    const userInput = readlineSync.question(colors.yellow("You:"));

    try {
      //construt messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      //Add latest user input
      messages.push({ role: "user", content: userInput });

      //Call the API with the user input
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // messages: [{ role: "user", content: userInput }],
        messages: messages,
      });

      //Get completion text-content
      const completionText = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot:") + completionText);
        return;
      }
      console.log(colors.green("Bot:") + completionText);

      //Update history with user input and assistant response of the gpt
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
