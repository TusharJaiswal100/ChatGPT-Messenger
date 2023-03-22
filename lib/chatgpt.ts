import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // it acts as a key to access openai api
})

const openai= new OpenAIApi(configuration)

export default openai;