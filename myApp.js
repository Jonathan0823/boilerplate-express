require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, _, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (_, res) => {
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

app.get("/now", function middleware(req, _, next) {
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
  const string = req.method === "POST" ? `${req.body.first} ${req.body.last}` : `${req.query.first} ${req.query.last}`;
  res.json({
    name: `${string}`
  });
};

app.route("/name").get(sendName).post(sendName);



































module.exports = app;
