const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const clientSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        // required: [true, "Please enter your first name"],
      },
      lastName: {
        type: String,
        // required: [true, "Please enter your last name"],
      },
    },

    email: {
      type: String,
      // required: [true, "Please Enter Your Email"],
      // unique: true,
      // validate: [validator.isEmail, "Please Enter a valid Email"],
    },

    mobile: {
      type: Number,
      // required: [true, "Please enter your mobile number"],
      // minLength: [10, "Please Enter a valid Mobile Number"],
      // unique: true,
    },

    password: {
      type: String,
      // required: [true, "Please Enter Your Password"],
      // minLength: [
      //   8,
      //   "Password should be greater than or equal to 8 characters",
      // ],
      // select: false,
    },
    walllet: {
        type: Number,
        required: true,
        default:1,
    },
    avatar: {
      public_id: {
        type: String,
        //   required: true,
      },
      url: {
        type: String,
        //   required: true,
      },
    },
    role: {
      type: String,
      default: "client",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  // { timestamps: true }
);

clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// // JWT TOKEN
clientSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

clientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// // Generating Password Reset Token
clientSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding resetPasswordToken to clientSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Client", clientSchema);
