const express = require("express");
const server = express();
const bodyParser = require("body-parser");

server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const logger = (req, res, next) => {
  const errorObj = new Error("wrong access ");
  next(errorObj);
  console.log(" ==> i am logging before  ");
  next();
  console.log(" ==> i am logging after ");
};

const auth = (req, res, next) => {
  console.log(" ==> auth am logging ");
  next();
};

const errorHandler = (err, req, res, next) => {
  if (err)
    return res
      .status(400)
      .json({ err: "error is just happened, " + err.message });
};
server.use(logger);

server.get("/api", auth, (req, res) => {
  console.log("==> api is here ");
  res.send("api is running");
});
server.get("/users", (req, res, next) => {
  console.log("==> users is here ");
  res.send("users is here ");
});

server.use(errorHandler);
server.listen(5000, () => {
  console.log(" server is listening on port 5000");
});
