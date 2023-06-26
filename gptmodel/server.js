const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Replace with your GPT-3 API key and import the OpenAI library
// const apiKey = 'your-api-key';
// const openai = require('openai')(apiKey);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  try {
    // Get transcript from request body
    const { transcript } = req.body;

    // Call GPT-3 API here using "transcript" as input.
    // For now, we'll return a dummy response.

    /*
      Uncomment the following lines after setting up your OpenAI account and importing "openai".

      const result = await openai.Completion.create({
        engine: 'text-davinci-002',
        prompt: `${transcript.map((message) => message.text).join('\n')}\n`,
        max_tokens: 150,
        n: 1,
        temperature: 0.7,
      });

      res.status(200).json({ text: result.choices[0].text.trim() });

     */

     // Dummy response for testing purposes:
     res.status(200).json({ text: 'Hello! I am a Chatbot.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));