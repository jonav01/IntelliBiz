const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const connectdB = require("./config/db.js");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/service", serviceRoutes);
app.use(errorHandler)
connectdB();
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
