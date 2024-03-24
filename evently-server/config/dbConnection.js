const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aditya221b",
  database: "evently",
});

const sequelize = new Sequelize({
  dialect: "mysql", // Or any other dialect you're using
  host: "localhost",
  username: "root",
  password: "aditya221b",
  database: "evently",
});

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// Synchronize the model with the database
sequelize
  .sync({ force: false }) // Set force to true to drop existing tables and recreate them
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

module.exports = { dbConnection, sequelize };
