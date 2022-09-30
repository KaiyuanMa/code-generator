try {
  require('../.env');
}
catch(ex) {
  console.log('running locally? create .env file');
  console.log('deployed? set environment variables?');
}

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static("public"));
app.use("/api/session", require("./routes/session"));
app.use("/api/dataSet", require("./routes/dataSet"));
app.use("/api/model", require("./routes/model"));
app.use("/api/entry", require("./routes/entry"));
app.use("/api/validation", require("./routes/validation"));
app.use("/api/user", require("./routes/user"));
app.use("/api/node", require("./routes/node"));
app.use("/api/edge", require("./routes/edge"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const setUp = () => {
  app.listen(port, () => console.log(`listening on port ${port}`));
};

setUp();
