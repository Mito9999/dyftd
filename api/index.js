const express = require("express");
const cors = require("cors");

const api = require("./routes/api.js");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5001;

app.use("/api", api);

module.exports = app.listen(PORT, () => {
  console.log(`Frontend: http://localhost:${PORT - 1}/`);
  console.log(`Backend: http://localhost:${PORT}/`);
});
