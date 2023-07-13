const { Schema } = require("mongoose");

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

module.exports = needSchema;
