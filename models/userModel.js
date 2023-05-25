const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    default: "salesbeezdm@gmail.com",
  },
  mobile: {
    type: String,
    required: [true, "Please provide mobile"],
    unique: [true, "mobile already exist"],
    trim: true,
  },

  agentstatus: {
    type: Boolean,
    default: false,
  },
  avatar: {
      type: String,
      default: "https://res.cloudinary.com/dh1fsseho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669977353/Avatar/avatar2_z6yynb.jpg",
    },
  
  role: {
    type: String,
    default: "user",
  },
  agentId: {
    type: String,
   required: true,
    
  },
  wallet:{
    type: Number,
    default: 0
  },
  cashback:{
    type: Number,
    default: 0
  },
  coinBalance: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
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

module.exports = mongoose.model("User", userSchema);
