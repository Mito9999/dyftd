import nc from "next-connect";
import database, { NextReq, NextRes } from "@middleware/database";
import { defaultSwitchValues } from "@constants/constants";

const handler = nc();
handler.use(database);

handler.get(async (req: NextReq, res: NextRes) => {
  const { groupId } = req.query;
  const collection = req.db.collection("groups");

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

handler.post(async (req: NextReq, res: NextRes) => {
  const { groupId } = req.query;
  const { password }: { password: string } = req.body;
  const collection = req.db.collection("groups");

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
    res.status(403).json({ message: "Failed to create group." });
  }
});

export default handler;
