const { model, Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// function dateValidator(value) {
//   return this.startDate <= value;
// }

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
        return !arr.toLowerCase().includes("event");
      },
      message: "event isnt allowed",
    },
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  image: {
    type: String,
    required: true,
  },
  numOfSeats: {
    type: Number,
    min: 5,
  },
  bookedSeats: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        return this.numOfSeats >= value;
      },
      message: "Booked seats must be less than or equal to number of seats",
    },
  },
  startDate: {
    type: Date,
    min: Date.now() + 24,
  },
  endDate: {
    type: Date,
    format: "DD-MM-YYYY",
    validate: {
      validator: function (value) {
        return this.startDate <= value;
      },
      message: "Start date must be earlier than end date",
    },
  },
});

EventsSchema.plugin(uniqueValidator);
module.exports = model("Event", EventsSchema);

/* "organizer":
"name":
"message":
"email":
"numOfSeats":
"bookedSeats":
"startDate":
"endDate":
*/
