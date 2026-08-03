const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const Groq = require('groq-sdk');
const express = require('express');
const pino = require('pino');
const qr = require('qrcode-terminal');


const app = express();
app.get('/', (req, res) => res.send('Bot Active'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Ready on port ${PORT}`));


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const authenticatedUsers = new Set();
const PASSWORD = "kill"; 

const T3LI9 = "أنتِ مساعدة ذكية، تتحدثين بالعامية اللطيفة.";


async function getAIResponse(userMessage) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage }
            ],
            model: 'llama',
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error("Llama/Groq Error:", error.message);
        return "هناك خلل تقني بسيط، سأعود حالن";
    }
}

async function connectToWhatsApp() {

