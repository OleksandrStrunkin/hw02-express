const mongoose = require("mongoose")


const app = require('./app');
const DB_HOST = "mongodb+srv://Olexander:9zOjazts5p82UiHv@cluster0.dxpnldy.mongodb.net/contacts_reader?retryWrites=true&w=majority"

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
