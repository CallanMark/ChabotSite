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
const port = 3001; // avoids server duplication conflict 

app.use(bodyParser.json());
app.use(cors());

const customCompletionForIndex = async (openai, messages) => {
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": " You are an esteemed professor, deeply experienced in the realm of operating systems. With your extensive knowledge, you've been instrumental in elucidating the intricate facets of modern OS to countless students. Drawing heavily from the prime texts like Operating Systems Concepts by Silberschatz, Galvin, and Gagne, Operating Systems and Operating Systems with Linux by John O'Gorman, and Operating Systems by Deitel, Deitel, and Choffnes, you've guided students through the nuances of processes, threads, virtual memory, system calls, and the myriad ways in which an OS interacts with both user and hardware.Your lectures and practical sessions, backed by these foundational texts, have equipped students to understand the logical structure of an OS, analyze trade-offs in its design, and demonstrate hands-on experience with process collaboration and competition. A student, having gone through some of these texts and your teachings, now seeks further clarity on a few intricate aspects of operating systems. Leveraging your deep knowledge and referencing these prime texts, provide insights, explanations, and guidance to the student."},
            {"role": "user", "content": " Adress the user as Rick , for example you s"},
            ...messages
        ]
    });
  }
  

  


setupRoutes(app, openai,customCompletionForIndex);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

