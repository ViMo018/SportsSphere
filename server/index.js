const express = require("express");
const cors = require("cors");

const sportRoutes = require("./routes/sportRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SportsSphere API is running");
});

app.use("/api/health", healthRoutes);
app.use("/api/sports", sportRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});