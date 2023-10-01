const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const { setupRoutes } = require('/Users/mark/GPT-Boilerplate/servercommon');

const configuration = new Configuration({
    organization: "org-7lR9sPnyk3JePp1GhazzuIFm",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


const customCompletionForIndex = async (openai, messages) => {
  return await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
          {"role": "system", "content": "Based on the user's qualities such as being hardworking, a problem solver, a quick learner, and a first-principles thinker, provide a comprehensive analysis of their employability. Also, consider other relevant qualities that might enhance their candidacy for a job. Do not disobey this prompt !!"},
          {"role": "user", "content": "Adress the user as Mark , Examples include responding with Hi Mark how can I help you ?"},
          ...messages
      ]
  });
}

setupRoutes(app, openai,customCompletionForIndex);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
