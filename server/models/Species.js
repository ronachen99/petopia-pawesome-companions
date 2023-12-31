// import required dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// define the species Schema
const speciesSchema = new Schema({
  speciesType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  needs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Need",
      required: true,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

// create the Species model
const Species = mongoose.model("Species", speciesSchema);

module.exports = Species;
