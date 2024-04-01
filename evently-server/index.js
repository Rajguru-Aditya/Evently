const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { dbConnection } = require("./config/dbConnection");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/events", require("./routes/eventRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
