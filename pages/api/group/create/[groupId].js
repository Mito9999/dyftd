import nc from "next-connect";
import database from "../../../../middleware/database";
import { defaultSwitchValues } from "../../../../constants/constants";

const handler = nc();
handler.use(database);

handler.get(async (req, res) => {
  const { groupId } = req.query;
  const collection = await req.db.collection("groups");

  const group = await collection
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

handler.post(async (req, res) => {
  const { groupId } = req.query;
  const { password } = req.body;
  const collection = await req.db.collection("groups");

  const group = await collection
    .find({
      number: Number(groupId),
    })
    .toArray();
  if (group.length === 0) {
    collection.insertOne({
      number: Number(groupId),
      password,
      values: defaultSwitchValues,
    });
    res.status(200).json({ message: "Group Created!" });
  } else {
    res.status(500).json({ message: "Failed to create group." });
  }
});

export default handler;
