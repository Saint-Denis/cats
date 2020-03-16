const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
var cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/api/user");
const authRouter = require("./routes/api/auth");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

connectDB();

const port = 8080;

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendfile("./public/index.html");
});

server.listen(port, () => console.log("server started"));
