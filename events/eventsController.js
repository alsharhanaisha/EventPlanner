const Event = require("../database/models/Event");

let abc = Event;

exports.fetchEventsController = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(201).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addEventController = async (req, res) => {
  try {
    const event = req.body;
    const newEvent = await Event.create(event);
    res.status(201).json({ msg: "An event is Created", newEvent });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.getEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findById(eventId);
    if (foundEvent) {
      res.status(201).json(foundEvent);
    } else {
      res.status(404).json({ msg: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findByIdAndDelete(eventId);
    if (foundEvent) {
      res.status(201).end();
    } else {
      res.status(404).json({ msg: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, event, {
      new: true,
    });

    res
      .status(201)
      .json({ msg: "Updated Successfully", payload: updatedEvent });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.fetchFullyBookedEventsController = async (req, res) => {
  try {
    let fullyBookedEvents = await Event.find();
    fullyBookedEvents = fullyBookedEvents.filter(
      (ev) => ev.numOfSeats === ev.bookedSeats
    );
    res.status(201).json(fullyBookedEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
