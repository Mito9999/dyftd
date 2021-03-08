const app = require("express")();
var cors = require("cors");

app.use(cors());

const PORT = 5001;

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`Frontend: http://localhost:${PORT - 1}/`);
  console.log(`Backend: http://localhost:${PORT}/`);
});
