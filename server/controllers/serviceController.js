const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createAd = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.status(200).json({ data: response.data.choices[0].text });
  } catch (err) {
    console.log(err);
  }
});

const createSummary = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  res.status(200).json({ data: response.data.choices[0].text });
});

module.exports = { createAd, createSummary };

// "Convert my short hand into a first-hand account of the meeting:\n\nTom:Profits up 50%\nJane: New servers are online\nKjel: Need more time to fix software\nJane:Happy to help\nParkman: Beta testing almost done"

// "Write a creative ad for the following product to run on Facebook aimed at parents:\n\nProduct: Learning Room is a virtual environment to help students from kindergarten to high school excel in school."
