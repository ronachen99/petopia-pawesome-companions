// import required dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// define the pet schema
const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: Schema.Types.ObjectId,
    ref: "Species",
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  gender: {
    type: String,
    required: true,
  },
  needs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Need",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// create the Pet model
const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet;