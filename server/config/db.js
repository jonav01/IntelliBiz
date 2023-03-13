const mongoose = require("mongoose");

const connectdB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB connected :");
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit();
  }
};

module.exports = connectdB;