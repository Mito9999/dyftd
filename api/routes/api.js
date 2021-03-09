require("dotenv").config();
var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to MongoDB");
    const db = client.db("dyftd");
    const switchesCollection = db.collection("switches");
    const groupsCollection = db.collection("groups");

    router.get("/", async (_, res) => {
      const switches = await switchesCollection.find().toArray();
      res.json(switches[0].values);
    });

    router.post("/", async (req, res) => {
      try {
        const newValues = req.body;
        await switchesCollection.updateOne(
          { _id: ObjectID("6047717901aa1ca65dd5237a") },
          { $set: { values: newValues } }
        );
        res.json(newValues);
      } catch {
        res.status(500).json({ message: "Server Error" });
      }
    });

    router.get("/group/:groupId", async (req, res) => {
      const { groupId } = req.params;
      const group = await groupsCollection
        .find({ number: Number(groupId) })
        .toArray();

      if (group.length > 0) {
        res.status(200).json({ group: group[0].number });
      } else {
        res.status(404).json({ group: null });
      }
    });

    router.post("/group/:groupId", async (req, res) => {
      const { groupId } = req.params;
      const { password } = req.body;

      const group = await groupsCollection
        .find({
          number: Number(groupId),
          password,
        })
        .toArray();
      console.log(group);
      if (group.length === 1) {
        res.status(200).json({ group: group[0].number });
      } else {
        res.status(404).json({ group: null });
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
        });
        res.status(200).json({ message: "Group Created!" });
      } else {
        res.status(404).json({ message: "Failed to create group." });
      }
    });

    // NOT FOR PRODUCTION
    router.get("/groups", async (req, res) => {
      const data = await groupsCollection.find().toArray();
      res.json(data);
    });
  })
  .catch((error) => console.error(error));

module.exports = router;
