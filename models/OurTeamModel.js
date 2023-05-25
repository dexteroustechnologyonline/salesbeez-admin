const mongoose = require("mongoose");

const OurTeamSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  position: {
    type: String,
  },

  icon: {
    type: String,
  },
  status:{
    type:Boolean,
    default:false,
  }
});

module.exports = mongoose.model("Ourteam", OurTeamSchema);
