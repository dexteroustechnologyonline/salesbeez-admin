const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const addressSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: [true, "Please enter your first name"],
      },
      lastName: {
        type: String,
      },
    },

    phone: {
      type: String,
      minLength: [10, "Please Enter a valid Mobile Number"],
    },

    altPhone: {
      type: String,
    },

    house: {
      type: String,
      required: true,
    },
    street: {
      type: String,
        required: true,
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: String,
        required: true,
    },
    landmark: String,

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default:"India"
    },

    pincode: {
      type: Number,
      required: true,
    },

    addressType: {
      type: String,
      default:"Home"
     
    },
    primary: {
      type: Boolean,
      default: false,
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
