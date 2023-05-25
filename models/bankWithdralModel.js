const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const bankwithdrawSchema = new mongoose.Schema({
  agentId: {
    type: String,
    required: true,
  },
  withdrawAmount: {
    type: Number,
    required: true,
  },
  bankDetails: {
    accountHolderName: {
      type: String,
      trim: true,
      required: true,
    },
    accountNumber: {
      type: Number,
      trim: true,
      required: true,
    },
    bankName: {
      type: String,
      trim: true,
      required: true,
    },
    bankBranchName: {
      type: String,
      trim: true,
      required: true,
    },
    ifscNumber: {
      type: String,
      trim: true,
      required: true,
    },
    panCard: {
      type: String,
      required: [true, "Please provide pan"],
      trim: true,
    },
  },
  trabsitionId: {
    type: String,
  },
  trabsitionDetails: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BankWithdraw", bankwithdrawSchema);
