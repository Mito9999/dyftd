require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Db } from "mongodb";
import nextConnect from "next-connect";

export interface NextReq extends NextApiRequest {
  db: Db;
}
export interface NextRes extends NextApiResponse {}

let cachedDb: Db | null = null;
const connectToDatabase = async (
  req: NextReq,
  res: NextRes,
  next: () => void
) => {
  try {
    if (cachedDb) {
      req.db = cachedDb;
      console.log("🔄 Using Cached DB Connection");
      return next();
    }

    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    const client = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("dyftd");
    cachedDb = db;
    req.db = db;

    console.log("🔥 Reconnected to DB");
    next();
  } catch (err) {
    console.log(err);
  }
};

const middleware = nextConnect();
middleware.use(connectToDatabase);

export default middleware;
