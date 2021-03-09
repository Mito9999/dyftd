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

const groups = [
  {
    number: 123456,
    password: "hello",
  },
  {
    number: 654321,
    password: "world",
  },
];

app.get("/api/group/:groupId", (req, res) => {
  const { groupId } = req.params;
  setTimeout(() => {
    const group = groups.find((g) => g.number === Number(groupId));
    if (group) {
      res.status(200).json({ group: group.number });
    } else {
      res.status(404).json({ group: null });
    }
  }, 1000);
});

app.post("/api/group/:groupId", (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;

  setTimeout(() => {
    const group = groups.find(
      (g) => g.number === Number(groupId) && g.password === password
    );

    if (group) {
      res.status(200).json({ group: group.number });
    } else {
      res.status(404).json({ group: null });
    }
  }, 1000);
});

app.post("/api/group/create/:groupId", (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;

  setTimeout(() => {
    const groupExists = groups.find((g) => g.number === Number(groupId));
    if (!groupExists) {
      groups.push({
        number: Number(groupId),
        password,
      });
      res.status(200).json({ message: "Group Created!" });
    } else {
      res.status(404).json({ message: "Failed to create group." });
    }
  }, 1000);
});

module.exports = app.listen(PORT, () => {
  console.log(`Frontend: http://localhost:${PORT - 1}/`);
  console.log(`Backend: http://localhost:${PORT}/`);
});
