const express = require("express");
const cors = require("cors");
const { User } = require("./db");
const mainRouter = require("./routes/index");

const app = express();

// allows the use of cors, since the frontend and backend will be hosted on seperate routes, cors is used to tell the server which url is safe and which isn't
app.use(cors());

// extracts raw data from requests (such as JSON, URL-encoded forms, or raw text) and transforms it into a JavaScript object accessible via the req.body property
app.use(express.json());

// send all requests to /api/v1 to mainRouter
app.use("/api/v1", mainRouter);

app.listen(3000);
