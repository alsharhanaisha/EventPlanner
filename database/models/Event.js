const { model, Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const EventsSchema = new Schema({
  organizer: {
    type: String,
    maxLength: 20,
    unique: true,
  },
  name: {
    type: String,
    validate: {
      validator: function (arr) {
        console.log(!arr.includes("event"));
        return !arr.includes("event");
      },
      message: "",
    },
  },
  email: {
    type: String,
    // required: true,
    match: /.+\@.+\..+/,
  },
  image: {
    type: String,
  },
  numOfSeats: {
    type: Number,
    min: 5,
  },
  bookedSeats: {
    type: Number,
    default: 0,
    max: 5,
  },
  startDate: {
    type: Date,
    min: Date.now + 24 * 60 * 60 * 1000,
  },
  endDate: {
    type: Date,
  },
});

EventsSchema.plugin(uniqueValidator);
module.exports = model("Event", EventsSchema);
