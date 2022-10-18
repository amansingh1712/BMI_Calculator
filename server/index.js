const express = require("express");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cors = require("cors");

const connection = require("./storage/db");
require("dotenv").config();

const PORT = process.env.PORT || PORT;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/profile", userRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, async () => {
  await connection;

  console.log("connected to db");

  console.log(`server started on port ${PORT}`);
});
