const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
    method: {
      type:String
  },
    response: {
      type:Number
  },
    timestamp: {
      type:Number
  }
});

module.exports = mongoose.model("Log", logSchema);