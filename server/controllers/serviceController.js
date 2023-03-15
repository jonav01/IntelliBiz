const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const { advertisementModel, summaryModel } = require("../models/serviceModel");

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// GET REQUESTS
const getAd = asyncHandler(async (req, res) => {
  const allAdvertisements = await advertisementModel.find({
    user_id: req.user._id,
  });
  res.status(200).json(allAdvertisements);
});

const getSummary = asyncHandler(async (req, res) => {
  const allSummaries = await summaryModel.find({ user_id: req.user._id });
  res.status(200).json(allSummaries);
});

// POST REQUESTS
const createAd = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (prompt) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const data = response.data.choices[0].text;
    try {
      const advertisement = await advertisementModel.create({
        user_id: req.user._id,
        data,
      });
      res.status(200).json(advertisement);
    } catch (err) {
      res.status(500);
      throw new Error("Cannot add to database");
    }
  } else {
    res.status(404);
    throw new Error("Please send a prompt");
  }
});

const createSummary = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (prompt) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const data = response.data.choices[0].text;

    try {
      const summary = await summaryModel.create({
        user_id: req.user._id,
        data,
      });
      res.status(200).json(summary);
    } catch (err) {
      res.status(500);
      throw new Error("Cannot add to databaase");
    }
  } else {
    res.status(404);
    throw new Error("Please pass on a prompt");
  }
});

module.exports = { getAd, getSummary, createAd, createSummary };

// "Convert my short hand into a first-hand account of the meeting:\n\nTom:Profits up 50%\nJane: New servers are online\nKjel: Need more time to fix software\nJane:Happy to help\nParkman: Beta testing almost done"

// "Write a creative ad for the following product to run on Facebook aimed at parents:\n\nProduct: Learning Room is a virtual environment to help students from kindergarten to high school excel in school."
