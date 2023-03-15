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
  try {
    const allAdvertisements = await advertisementModel.find({
      user_id: req.user._id,
    });
    if (allAdvertisements) {
      res.status(200).json(allAdvertisements);
    } else {
      res.status(400);
      throw new Error("Couldn't find any advertisement");
    }
  } catch (err) {
    console.log(err.statusCode);
  }
});
const getSummary = asyncHandler(async (req, res) => {
  try {
    const allSummaries = await summaryModel.find({ user_id: req.user._id });
    if (allSummaries) {
      res.status(200).json(allSummaries);
    } else {
      res.status(400);
      throw new Error("Couldn't find any summary");
    }
  } catch (err) {
    console.log(err.statusCode);
  }
});

// POST REQUESTS
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
    const data = response.data.choices[0].text
    console.log(data)
    if (data) {
      try {
        const advertisement = await advertisementModel.create({
          user_id: req.user._id,
          data,
        });
        res.status(200).json(advertisement);
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(401);
      throw new Error("API didn't send data");
    }
  } catch (err) {
    console.log(err);
  }
});

const createSummary = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const data = response.data.choices[0].text
    if (data) {
      try {
        const summary = await summaryModel.create({
          user_id: req.user._id,
          data,
        });
        res.status(200).json(summary);
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(401);
      throw new Error("API didn't send data");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = { getAd, getSummary, createAd, createSummary };

// "Convert my short hand into a first-hand account of the meeting:\n\nTom:Profits up 50%\nJane: New servers are online\nKjel: Need more time to fix software\nJane:Happy to help\nParkman: Beta testing almost done"

// "Write a creative ad for the following product to run on Facebook aimed at parents:\n\nProduct: Learning Room is a virtual environment to help students from kindergarten to high school excel in school."
