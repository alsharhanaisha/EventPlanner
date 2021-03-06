const express = require("express");
const {
  fetchEventsController,
  addEventController,
  getEventController,
  deleteEventController,
  updateEventController,
  fetchFullyBookedEventsController,
  fetchUpcomingEventsController,
} = require("./eventsController");

const eventRouter = express.Router();

eventRouter.get("/", fetchEventsController);
eventRouter.post("/", addEventController);
eventRouter.get("/event/:eventId", getEventController);
eventRouter.delete("/:eventId", deleteEventController);
eventRouter.put("/:eventId", updateEventController);
eventRouter.get("/fullybooked", fetchFullyBookedEventsController);
eventRouter.get("/upcomingevents", fetchUpcomingEventsController);

module.exports = eventRouter;
