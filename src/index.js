const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


fs.readdirSync(path.join(__dirname, "routes/v1")).forEach((route) => {
    app.use(`/api/v1/${route.replace(".js", "")}`, require(`./routes/v1/${route}`).default);
})

const server = app.listen(process.env.PORT, () => {
    
})