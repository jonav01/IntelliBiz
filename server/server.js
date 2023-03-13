const express = require("express");
const dotenv = require("dotenv");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

app.use(express.json())
// app.use('/api/user', userRoutes)
app.use("/api/service", serviceRoutes);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
