import openaiClient from "./api.js"

const generate = async (queryDescription) => {

    const daVinci = async (queryDescription) => {
        const response = await openaiClient.completions.create({
            model: "text-davinci-003",
            prompt: `Convert the following natural language description into a SQL query: \n\n${queryDescription}.`,
            max_tokens: 100,
            temperature: 0,
        });
        return response.choices[0].text;
    }

    const chatGptApi = async (queryDescription) => {
        const messages = [
            { role: "system", content: `You are a translator from plain English to SQL.` },
            { role: "user", content: `Convert the following natural language description into a SQL query: \n\n` },
            { role: "assistant", content: `SELECT * FROM users;` },
            { role: "user", content: `Convert the following natural language description into a SQL query: \n\n` }
        ];
        const response = await openaiClient.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });
        return response.choices[0].message.content;
    }

    return await daVinci(queryDescription);
}

export default generate;