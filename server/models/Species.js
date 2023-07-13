// import required dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// define the species Schema
const speciesSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

// create the Species model
const Species = mongoose.model("Species", speciesSchema);

module.exports = Species;
