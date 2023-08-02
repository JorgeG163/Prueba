const { Schema, model } = require("mongoose");

const huellacarbonoSchema = new Schema({
    
  tasadefotosintesis: {
    type: String,
    required: true
  },
  área: {
    type: String,
    required: true
  },
  densidadelaire: {
    type: String,
    required: true
  }
 
});


module.exports = model("CO2", huellacarbonoSchema);
