// import required dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// define the pet schema
const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 1,
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
    enum: ["Male", "Female"],
  },
  speciesId: {
    type: Schema.Types.ObjectId,
    ref: "Species",
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// create the Pet model
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
