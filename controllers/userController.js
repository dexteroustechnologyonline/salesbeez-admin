const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const Agent = require("../models/agentModel");
const Client = require("../models/clientModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { sendUserToken } = require("../utils/jwtToken");

exports.RegisterUser = catchAsyncErrors(async (req, res, next) => {
  try {
    // let agent = await Agent.findOne({ referCode: req.body.referCode });
    // if (!agent) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "agent not found",
    //   });
    // }
    // const agentid = agent._id;
    // req.body.agentId = agentid;
    // console.log(req.body);
    const user = await User.create(req.body);
    if (!user) {
      return res.status(501).json({
        success: false,
        message: "user not created",
      });
    }
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.myUserAll = catchAsyncErrors(async (req, res) => {
  try {
    const users = await User.find();
    for (let index = 42; index < users.length; index++) {
      const userid = users[index]._id;
      let user = await User.findById(userid);

      if (!user) {
        return res.status(500).json({
          success: false,
          message: "user not found",
        });
      }
      user.agentstatus = true;

      user = await User.findByIdAndUpdate(userid, user, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error,
    });
    res.status(400).json({
      success: false,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.getAllUser = catchAsyncErrors(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.createNewUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findOne({ mobile: req.body.mobile });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    const name = user.name;
    const clientid = user._id;
    const email = user.email;
    const agentId = user.agentId;
    const mobile = user.mobile;

    res.status(200).json({
      success: true,
      name,
      clientid,
      email,
      agentId,
      mobile,
      user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.LoginAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    const name = user.name;
    const clientid = user._id;
    const roles = user.role;
    if (role !== roles) {
      return next(new ErrorHander("Invalid role", 401));
    }

    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    res.status(201).json({
      success: true,
      name,
      email,
      clientid,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.mobileExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findOne({ mobile: req.params.mobile });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "new mobile number",
      });
    }
    const name = user.name;
    const clientid = user._id;
    const email = user.email;
    const agentId = user.agentId;

    return res.status(200).json({
      success: true,
      message: " mobile number already exits",
      name,
      clientid,
      email,
      agentId,
      user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.emailExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "new email",
      });
    }

    return res.status(200).json({
      success: true,
      message: " email already exist",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.referalcodeExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findOne({ refercode: req.params.refercode });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "new refercode",
      });
    }

    return res.status(200).json({
      success: true,
      message: " refercode already exist",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.getuserbyRefralAgent = catchAsyncErrors(async (req, res, next) => {
  try {
    let users = await User.find({ agentId: req.params.agentid });

    if (!users) {
      return res.status(500).json({
        success: false,
        message: "new refercode",
      });
    }

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.EditClientbyClientId = catchAsyncErrors(async (req, res, next) => {
  try {
    let client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(500).json({
        success: false,
        message: "client not found",
      });
    }
    client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      client: client,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.clentbyphonenumber = catchAsyncErrors(async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.params.mobilenumber });
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.sentOpt = catchAsyncErrors(async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.params.mobilenumber });
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.updateclentbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findById(req.params.clientid);
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    user = await User.findByIdAndUpdate(req.params.clientid, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.UploadProfilepic = catchAsyncErrors(async (req, res, next) => {
  try {
    const avatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "User/Pic",
      width: 200,
      crop: "scale",
    });
    const avatars = avatar.secure_url;
    res.status(200).json({
      success: true,
      avatars,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
