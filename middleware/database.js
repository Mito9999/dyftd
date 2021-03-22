require("dotenv").config();
import nextConnect from "next-connect";

const MongoClient = require("mongodb").MongoClient;
let cachedDb = null;

const connectToDatabase = async (req, _, next) => {
  if (cachedDb) {
    req.db = cachedDb;
    return next();
  }

  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("dyftd");
  cachedDb = db;
  req.db = db;

  next();
};

const middleware = nextConnect();
middleware.use(connectToDatabase);

export default middleware;
