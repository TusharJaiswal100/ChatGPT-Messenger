// inside of this we make connection with chatGPT


import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {      // prompt: string means , prompt is a string
     const res = await openai.createCompletion({
        model,
        prompt, 
        temperature: 0.9,
        top_p: 1,
        max_tokens:1000,
        frequency_penalty: 0,
        presence_penalty: 0,
     }).then(res => res.data.choices[0].text)
     .catch(
        (err) => 
        `ChatGPT was unable to find an answer for that! (Error: ${err.
        message})`
        );
        return res;
};

export default query;