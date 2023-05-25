const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const commissionSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  agentId: {
    type: String,
    required: true,
  },

  groceryorderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Groceryorder",
  },
  generalorderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Generalorder",
  },
  commission: {
    type: Number,
    required: true,
  },
  commissionPercentage: {
    type: String,
  },
  type: {
    type: String,
    default: "Commission Earned",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Commission", commissionSchema);
