const express = require("express");
const app = express();
const sequelize = require("./config/connection");
const controllers = require("./controllers");

const Model = require("./models");

const PORT = 5500;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("I'm running.")
});
});