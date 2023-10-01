const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

function formatAssistantResponse(text) {
    let formattedText = text;

    // Formatting main headings
    formattedText = formattedText.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Formatting subheadings
    formattedText = formattedText.replace(/^## (.+)$/gm, '<h2>$1</h2>');

    // Formatting bullet points
    let bulletPoints = formattedText.match(/^- (.+)$/gm);
    if (bulletPoints) {
        formattedText = formattedText.replace(bulletPoints.join('\n'), `<ul>${bulletPoints.map(item => `<li>${item.slice(2)}</li>`).join('')}</ul>`);
    }

    return formattedText;
}



function setupRoutes(app, openai, customCompletion) {  // <-- add customCompletion as an argument
    app.post("/", async (req, res) => {
        const { messages } = req.body;
        console.log(messages);

        const completion = await customCompletion(openai, messages);

        completion.data.choices[0].message.content = formatAssistantResponse(completion.data.choices[0].message.content);

        res.json({
            completion: completion.data.choices[0].message
        });
    });

    app.get('/', (req, res) => {
        res.send('Server is running![GPT-boilerplate]');
    });
}

module.exports = {
    setupRoutes
};
