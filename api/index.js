const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5001;

let switchValues = {
  Sunday: { morning: false, afternoon: false },
  Monday: { morning: false, afternoon: false },
  Tuesday: { morning: false, afternoon: false },
  Wednesday: { morning: false, afternoon: false },
  Thursday: { morning: false, afternoon: false },
  Friday: { morning: false, afternoon: false },
  Saturday: { morning: false, afternoon: false },
};

app.get("/api", (_, res) => {
  res.json(switchValues);
});

app.post("/api", (req, res) => {
  switchValues = req.body;
  res.json(switchValues);
});

module.exports = app.listen(PORT, () => {
  console.log(`Frontend: http://localhost:${PORT - 1}/`);
  console.log(`Backend: http://localhost:${PORT}/`);
});
