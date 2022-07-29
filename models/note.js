require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(console.log("connected to MongoDB"))
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phoneNumberReg =
  /(^[0-9]{2,3}-[0-9]{8}$)|(^\([0-9]{2,3}\)[0-9]{8}$)|(^09[0-9]{8}$)/;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    match: [phoneNumberReg],
    required: true,
  },
  date: Date,
  id: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
