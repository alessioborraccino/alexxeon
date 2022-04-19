const express = require("express");
const path = require("path");
const app = express();

app.use("/.well-known", express.static(path.join(__dirname, "/.well-known")));

app.listen(process.env.PORT || 80, function () {
    console.log("listening on port 80")
});