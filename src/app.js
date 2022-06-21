const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

// Here is called all routes
const auth = require("./routes/auth");

// Here is connect all middleware
app.use(express.json());


const uri = process.env.MONGO_SERVER_URI

mongoose.connect(uri)
    .then(() => console.log("Server connect successfully!"))
    .catch(error => console.log(error));

// Here is connect all root routes
app.use("/api/user", auth);

app.listen(port, () => {
    console.log(`Server is running in port no is ${port}`);
});