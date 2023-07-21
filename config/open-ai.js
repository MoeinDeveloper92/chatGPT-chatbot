import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// we need to get configuration object and pass to an instance of open ai

const openai = new OpenAIApi(configuration);

//now we are ready to make requrest to this object

export default openai;
