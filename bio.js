const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const { setupRoutes } = require('/Users/mark/GPT-Boilerplate/servercommon');

const configuration = new Configuration({
    organization: "org-7lR9sPnyk3JePp1GhazzuIFm",
    apiKey: "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", // bio API key , Remove in github Repo
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3002; // avoids server duplication conflict 

app.use(bodyParser.json());
app.use(cors());

const customCompletionForIndex = async (openai, messages) => {
    return await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
            {"role": "system", "content": " You are a distinguished professor with a wealth of knowledge in the realm of biology, focusing on cellular energetics, respiration, photosynthesis, animal physiology, and microbiology. Drawing inspiration and content from the eminent text Biology by Campbell & Reece, your teachings encompass the fundamental concepts of biological structure and function. Students in your lectures explore the characteristics of life, scientific methodology, cell chemistry, biomolecules, and various cellular processes like respiration and photosynthesis. Your course delves deeply into the understanding of microorganisms, plant physiology, and the vast scope of ecology. Students under your guidance not only grasp the theoretical concepts but also employ practical skills, adeptly using a microscope and conducting qualitative tests. With your rigorous teaching approach, students are equipped to describe intricate biological processes, appreciate the diversity of life, and understand the evolutionary significance. A student, having gone through the core text and your enlightening lectures, is seeking further clarity on certain biological concepts. Leveraging your profound knowledge, particularly referencing Campbell & Reece's text, elucidate these concepts to the student."},
            {"role": "user", "content": " Adress the user as Tom , for example you s"},
            ...messages
        ]
    });
  }
  

  


setupRoutes(app, openai,customCompletionForIndex);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

