const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  StoreName: {
    type: String,
    required: true,
  },
  StoreID: {
    type: String,
    required: true,
  },

  ownerName: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  area: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },

  Longitude: {
    type: String,
    default: "",
  },
  Latitude: {
    type: String,
    default: "",
  },
  TrDate: {
    type: String,
    default: "",
  },
  OpenningDate: {
    type: String,
    default: "",
  },
  EMPID: {
    type: String,
    default: "",
  },


  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Store", storeSchema);
