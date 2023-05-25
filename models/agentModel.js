const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const agentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter  name"],
    trim: true,
  },

  lastname: {
    type: String,
    default:"",
    trim: true,
  },
  email: {
    type: String,
    default: "salesbeezdm@gmail.com",
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
    default: "Male",
  },
  mobile: {
    type: String,
    required: [true, "Please provide mobile"],
    unique: [true, "mobile already exist"],
    trim: true,
  },
  personalId: {
    adharCard: {
      type: String,
    },
    adharImage: {
      type: String,
    },
    panCard: {
      type: String,
      trim: true,
    },
    pancardImage: {
      type: String,
    },
    passBookImage: {
      type: String,
    },
  },
  nominineeDetails: {
    nomineeName: {
      type: String,
      trim: true,
    },
    nomineeRelation: {
      type: String,
    },
  },
  block: String,
  bankDetails: {
    accountHolderName: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      default: 0,
    },
    bankName: {
      type: String,
      trim: true,
    },
    bankBranchName: {
      type: String,
      trim: true,
    },
    ifscNumber: {
      type: String,
      trim: true,
    },
  },
  referCode: {
    type: String, //automatic generated unique number
    required: [true, "Please enter referCode"],
    unique: [true, "referCode already exist"],
    trim: true,
  },
  sponseredId: {
    type: String,
    required: [true, "Please enter SponcerMob"],
  },


  wallet: {
    type: Number,
    default: 0,
  },
  position: {
    type: String,
    default: "Marketing Executive",
  },
  business: {
    type: Number,
    default: 0,
  },
  agentbusiness: {
    type: Number,
    default: 0,
  },
  downlineagentbusiness: {
    type: Number,
    default: 0,
  },
  numberofDownlineOrders: {
    type: Number,
    default: 0,
  },

  status: {
    type: Boolean,
    default: true,
  },

  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dh1fsseho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669977353/Avatar/avatar2_z6yynb.jpg",
  },
  numberofOrders: {
    type: Number,
    required: true,
    default: 0,
  },
  totalSales: {
    type: Number,
    required: true,
    default: 0,
  },
  numberPromteME: {
    type: Number,
    required: true,
    default: 0,
  },
  numberPromteMM: {
    type: Number,
    required: true,
    default: 0,
  },
  numberPromteSMM: {
    type: Number,
    required: true,
    default: 0,
  },
  numberPromteAGM: {
    type: Number,
    required: true,
    default: 0,
  },
  numberPromteDGM: {
    type: Number,
    required: true,
    default: 0,
  },
  numberME: {
    type: Number,
    required: true,
    default: 0,
  },
  numberMM: {
    type: Number,
    required: true,
    default: 0,
  },
  numberSMM: {
    type: Number,
    required: true,
    default: 0,
  },
  numberAGM: {
    type: Number,
    required: true,
    default: 0,
  },
  numberDGM: {
    type: Number,
    required: true,
    default: 0,
  },
  numberGM: {
    type: Number,
    required: true,
    default: 0,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

agentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
agentSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

agentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
agentSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Agent", agentSchema);
