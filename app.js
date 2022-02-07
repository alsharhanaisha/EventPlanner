const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
const Event = require("./database/models/Event");
const eventRouter = require("./events/eventsRouter");
const {
  fetchFullyBookedEventsController,
} = require("./events/eventsController");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/events", eventRouter);
// app.get("/fully", fetchFullyBookedEventsController);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running", PORT);
  connectDB();
});
