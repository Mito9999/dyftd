import nc from "next-connect";
import database from "@middleware/database";
import { defaultSwitchValues } from "@constants/constants";

const handler = nc();
handler.use(database);

handler.get(async (req, res) => {
  try {
    const collection = await req.db.collection("users");

    const [updatedValues] = await collection
      .find({ email: "bob123@example.com" })
      .toArray();

    res.status(200).json(updatedValues.personalGroupValues);
  } catch {
    res.status(404).json(defaultSwitchValues);
  }
});

handler.post(async (req, res) => {
  try {
    const collection = await req.db.collection("users");
    const newValues = req.body;

    await collection.updateOne(
      { email: "bob123@example.com" },
      { $set: { personalGroupValues: newValues } }
    );
    res.status(200).json(newValues);
  } catch {
    res.status(500).json(defaultSwitchValues);
  }
});

export default handler;
