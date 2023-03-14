const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const advertisementModel = mongoose.model("Advertisement", serviceSchema);
const summaryModel = mongoose.model("Summary", serviceSchema);

module.exports = { advertisementModel, summaryModel };
