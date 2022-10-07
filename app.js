const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

//Routes
const tourRoute = require("./routes/tour-routes")
const userRoute = require("./routes/user-routes")


app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

// posting to database
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/tour', tourRoute)

app.use('/api/v1/user', userRoute)


module.exports = app;