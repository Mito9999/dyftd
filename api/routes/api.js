require("dotenv").config();
var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;

let VALUES = [
  {
    day: "Sunday",
    data: { morning: false, afternoon: true },
  },
  {
    day: "Monday",
    data: { morning: true, afternoon: true },
  },
  {
    day: "Tuesday",
    data: { morning: true, afternoon: true },
  },
  {
    day: "Wednesday",
    data: { morning: true, afternoon: false },
  },
  {
    day: "Thursday",
    data: { morning: false, afternoon: true },
  },
  {
    day: "Friday",
    data: { morning: false, afternoon: true },
  },
  {
    day: "Saturday",
    data: { morning: false, afternoon: false },
  },
];

MongoClient.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to MongoDB");
    // const db = client.db("dyftd");
    // const usersCollection = db.collection("users");
    // const groupsCollection = db.collection("groups");

    router.get("/", async (req, res) => {
      // const switches = await groupsCollection
      //   .find({ number: groupId })
      //   .toArray();
      // res.json(switches[0].values);
      res.json(VALUES);
    });

    router.post("/", async (req, res) => {
      try {
        const newValues = req.body;
        // await switchesCollection.updateOne(
        //   { _id: ObjectID("6047717901aa1ca65dd5237a") },
        //   { $set: { values: newValues } }
        // );
        // res.json(newValues);
        VALUES = newValues;
        res.json(VALUES);
      } catch {
        res.status(500).json({ message: "Server Error" });
      }
    });

    // router.get("/group/:groupId", async (req, res) => {
    //   const { groupId } = req.params;
    //   const group = await groupsCollection
    //     .find({ number: Number(groupId) })
    //     .toArray();

    //   if (group.length > 0) {
    //     res.status(200).json({ group: group[0].number });
    //   } else {
    //     res.status(404).json({ group: null });
    //   }
    // });

    // router.post("/group/:groupId", async (req, res) => {
    //   const { groupId } = req.params;
    //   const { password } = req.body;

    //   const group = await groupsCollection
    //     .find({
    //       number: Number(groupId),
    //       password,
    //     })
    //     .toArray();
    //   console.log(group);
    //   if (group.length === 1) {
    //     res.status(200).json({ group: group[0].number });
    //   } else {
    //     res.status(404).json({ group: null });
    //   }
    // });

    // router.get("/group/create/:groupId", async (req, res) => {
    //   const { groupId } = req.params;

    //   const group = await groupsCollection
    //     .find({
    //       number: Number(groupId),
    //     })
    //     .toArray();
    //   if (group.length === 0) {
    //     res.status(200).json({ message: "Group code is available!" });
    //   } else {
    //     res.status(409).json({ message: "Group code is taken." });
    //   }
    // });

    // router.post("/group/create/:groupId", async (req, res) => {
    //   const { groupId } = req.params;
    //   const { password } = req.body;

    //   const group = await groupsCollection
    //     .find({
    //       number: Number(groupId),
    //     })
    //     .toArray();
    //   if (group.length === 0) {
    //     groupsCollection.insertOne({
    //       number: Number(groupId),
    //       password,
    //     });
    //     res.status(200).json({ message: "Group Created!" });
    //   } else {
    //     res.status(404).json({ message: "Failed to create group." });
    //   }
    // });

    // // NOT FOR PRODUCTION
    // router.get("/groups", async (req, res) => {
    //   const data = await groupsCollection.find().toArray();
    //   const groups = data.map((d) => ({ _id: d._id, number: d.number }));
    //   res.json(groups);
    // });
  })
  .catch((error) => console.error(error));

module.exports = router;
