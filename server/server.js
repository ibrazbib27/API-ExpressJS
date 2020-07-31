const cors = require("cors");
const mainRouter = require("./routes");
const express = require("express");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", mainRouter);
app.use(express.static(path.join(__dirname, "../client")));


app.listen(3000);
