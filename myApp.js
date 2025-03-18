require('dotenv').config();
let express = require('express');
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: "HELLO JSON"
    });
  } else {
    res.json({
      message: "Hello json"
    });
  }
});

app.get("/now", function middleware(req, res, next) {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({
    time: req.time
  });
});

app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word
  });
});

const sendName = (req, res) => {
  res.json({
    name: `${req.query.first} ${req.query.last}`
  });
};

app.route("/name").get(sendName).post(sendName);



































module.exports = app;
