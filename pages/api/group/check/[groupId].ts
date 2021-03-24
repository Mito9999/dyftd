import nc from "next-connect";
import database, { NextReq, NextRes } from "@middleware/database";

const handler = nc();
handler.use(database);

handler.get(async (req: NextReq, res: NextRes) => {
  try {
    const { groupId } = req.query;
    const collection = req.db.collection("groups");

    const group = await collection.find({ number: Number(groupId) }).toArray();

    if (group.length > 0) {
      res.status(200).json({ group: group[0].number });
    } else {
      res.status(404).json({ group: null });
    }
  } catch {
    res.status(500).json({ group: null });
  }
});

handler.post(async (req: NextReq, res: NextRes) => {
  try {
    const { groupId } = req.query;
    const { password } = req.body;
    const collection = req.db.collection("groups");

    const group = await collection
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
    res.status(500).json({ group: null });
  }
});

export default handler;
