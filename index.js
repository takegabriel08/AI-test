/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
require('dotenv').config()
const fs = require('fs')
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 0.3,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run() {
    const chatSession = model.startChat({
        generationConfig,
    });

    const [prompt1, prompt2] = fs.readFileSync('./Prompts/Scop.txt', 'utf8').split('CLIENT REQUIREMENTS INPUT TEXT:\r\n');
    const prompt3 = fs.readFileSync('./Prompts/Structura.txt', 'utf8');
    const prompt4 = fs.readFileSync('./Prompts/Sugestii.txt', 'utf8');
    const prompt5 = fs.readFileSync('./Prompts/Total.txt', 'utf8');

    const prompts = [prompt1, prompt2, prompt3, prompt4, prompt5];
    let text = {};

    for (let index = 0; index < prompts.length; index++) {
        const prompt = prompts[index];

        let output = await chatSession.sendMessage(prompt);

        if (prompt.includes('Let me know if you understand')) {
            continue;
        }
        if (index == 1) {
            text.scop = await getText(output);
            fs.writeFileSync('offer.txt', fs.readFileSync('./Boiler/Scop.txt', 'utf8'));
            fs.appendFileSync('offer.txt', text.scop);
        }
        if (index == 2) {
            text.structura = await getText(output);
            fs.appendFileSync('offer.txt', fs.readFileSync('./Boiler/Structura.txt', 'utf8'));
            fs.appendFileSync('offer.txt', text.structura);
        }
        if (index == 3) {
            text.sugestii = await getText(output);
            fs.appendFileSync('offer.txt', fs.readFileSync('./Boiler/Sugestii.txt', 'utf8'));
            fs.appendFileSync('offer.txt', text.sugestii);
        }
        if (index == 4) {
            text.total = await getText(output);
            fs.appendFileSync('offer.txt', fs.readFileSync('./Boiler/Total.txt', 'utf8'));
            fs.appendFileSync('offer.txt', text.total);
            fs.appendFileSync('offer.txt', fs.readFileSync('./Boiler/Total2.txt', 'utf8'));
        }
    }
    console.log("FINISH!");
}
run();

async function getText(promptObj) {
    return await promptObj.response.text();
}
