const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");


const app = require("./app");

// DATABaSE connection
mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log(`Database connected`.red.bold)
});


// server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});