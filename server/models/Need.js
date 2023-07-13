// import required dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// define the need schema
const needSchema = new Schema({
  needType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fulfilled: {
    type: Boolean,
    required: true,
  },
});

// create the Need model
const Need = mongoose.model("Need", needSchema);

module.exports = Need;