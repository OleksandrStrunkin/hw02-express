const mongoose = require("mongoose")
require('dotenv').config();

const {DB_HOST} = process.env;
const app = require('./app');

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch(error => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });
