require("dotenv").config();
var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;

let DEFAULT_VALUES = [
  {
    day: "Sunday",
    data: { morning: false, afternoon: false },
  },
  {
    day: "Monday",
    data: { morning: false, afternoon: false },
  },
  {
    day: "Tuesday",
    data: { morning: false, afternoon: false },
  },
  {
    day: "Wednesday",
    data: { morning: false, afternoon: false },
  },
  {
    day: "Thursday",
    data: { morning: false, afternoon: false },
  },
  {
    day: "Friday",
    data: { morning: false, afternoon: false },
  },
  {
    day: "Saturday",
    data: { morning: false, afternoon: false },
  },
];

// TODO: Implement proper passwords with bcryptjs
MongoClient.connect(process.env.MONGO_URI, {
  useUnifiedTopology: false,
})
  .then((client) => {
    console.log("Connected to MongoDB");

    const db = client.db("dyftd");
    const usersCollection = db.collection("users");
    const groupsCollection = db.collection("groups");

    router.get("/", async (_, res) => {
      try {
        const [updatedValues] = await usersCollection
          .find({ email: "bob123@example.com" })
          .toArray();
        res.json(updatedValues.personalGroupValues);
      } catch {
        res.status(404).json(DEFAULT_VALUES);
      }
    });

    router.post("/", async (req, res) => {
      try {
        const newValues = req.body;
        await usersCollection.updateOne(
          { email: "bob123@example.com" },
          { $set: { personalGroupValues: newValues } }
        );
        res.json(newValues);
      } catch {
        res.status(500).json({ message: "Server Error" });
      }
    });

    //

    router.get("/group/:groupId", async (req, res) => {
      try {
        const { groupId } = req.params;
        const group = await groupsCollection
          .find({ number: Number(groupId) })
          .toArray();

        if (group.length > 0) {
          res.json({ group: group[0].number });
        } else {
          res.status(404).json({ group: null });
        }
      } catch {
        res.status(500).json({ message: "Server Error" });
      }
    });

    router.post("/group/:groupId", async (req, res) => {
      try {
        const { groupId } = req.params;
        const { password } = req.body;

        const group = await groupsCollection
          .find({
            number: Number(groupId),
            password,
          })
          .toArray();

        if (group.length === 1) {
          res.json({ group: group[0].number });
        } else {
          res.status(404).json({ group: null });
        }
      } catch {
        res.status(500).json({ message: "Server Error" });
      }
    });

    router.get("/group/create/:groupId", async (req, res) => {
      const { groupId } = req.params;

      const group = await groupsCollection
        .find({
          number: Number(groupId),
        })
        .toArray();
      if (group.length === 0) {
        res.status(200).json({ message: "Group code is available!" });
      } else {
        res.status(409).json({ message: "Group code is taken." });
      }
    });

    router.post("/group/create/:groupId", async (req, res) => {
      const { groupId } = req.params;
      const { password } = req.body;

      const group = await groupsCollection
        .find({
          number: Number(groupId),
        })
        .toArray();
      if (group.length === 0) {
        groupsCollection.insertOne({
          number: Number(groupId),
          password,
          values: DEFAULT_VALUES,
        });
        res.status(200).json({ message: "Group Created!" });
      } else {
        res.status(500).json({ message: "Failed to create group." });
      }
    });

    // // NOT FOR PRODUCTION
    // router.get("/groups", async (req, res) => {
    //   const data = await groupsCollection.find().toArray();
    //   const groups = data.map((d) => ({ _id: d._id, number: d.number }));
    //   res.json(groups);
    // });
  })
  .catch((error) => console.error(error));

module.exports = router;
