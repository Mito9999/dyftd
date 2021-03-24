import nc from "next-connect";
import database, { NextReq, NextRes } from "@middleware/database";
import { defaultSwitchValues } from "@constants/constants";

const handler = nc();
handler.use(database);

// Add password checking
handler.get(async (req: NextReq, res: NextRes) => {
  try {
    const { groupId } = req.query;
    const collection = req.db.collection("groups");

    const [updatedValues] = await collection
      .find({ number: Number(groupId) })
      .toArray();

    res.status(200).json(updatedValues.values);
  } catch {
    res.status(404).json(defaultSwitchValues);
  }
});

handler.post(async (req: NextReq, res: NextRes) => {
  try {
    const { groupId } = req.query;
    const collection = req.db.collection("groups");
    const newValues = req.body;

    await collection.updateOne(
      { number: Number(groupId) },
      { $set: { values: newValues } }
    );
    res.status(200).json(newValues);
  } catch {
    res.status(500).json(defaultSwitchValues);
  }
});

export default handler;
