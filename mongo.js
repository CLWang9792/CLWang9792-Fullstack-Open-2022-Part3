const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://Leo:${password}@cluster0.cqz9k.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  id: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "TEST",
  number: "02-155618",
  date: new Date(),
  id: "153",
});

person.save().then((result) => {
  console.log("number saved!");
  mongoose.connection.close();
});
