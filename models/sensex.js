const mongoose = require("mongoose");
const { Schema } = mongoose;

const sensexSchema = new Schema({
  open: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sensex", sensexSchema);
