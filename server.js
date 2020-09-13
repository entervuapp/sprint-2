const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./dist/ng-entervu/"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/ng-entervu/" });
});

app.listen(process.env.PORT || 8080);
