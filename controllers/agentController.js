const Agent = require("../models/agentModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const https = require("https");
const request = require("request");

exports.registerAgent = catchAsyncErrors(async (req, res, next) => {
  try {

    const agent = await Agent.create(req.body);
    res.status(201).json({
      success: true,
      agent: agent,
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

exports.getAllAgent = catchAsyncErrors(async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json({
      success: true,
      agents: agents,
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

exports.loginAgentwithNumber = catchAsyncErrors(async (req, res, next) => {
  try {
    const agent = await Agent.findOne({
      $or: [{ referCode: req.body.mobile }, { mobile: req.body.mobile }],
    });

    if (!agent) {
      return res.status(500).json({
        success: false,
        message: "agent not found",
      });
    }

    res.status(200).json({
      success: true,
      agent,
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
exports.findagentbyReferalCoderphonenum = catchAsyncErrors(async (req, res) => {
  try {
    let agent = await Agent.findOne({
      $or: [{ referCode: req.params.mobile }, { mobile: req.params.mobile }],
    });
    if(agent){
      res.status(200).json({
        success: true,
        agent: agent,
      });
    }
    else{
      res.status(200).json({
        success: false,
        agent: agent,
      });
    }
  
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
exports.downline = catchAsyncErrors(async (req, res) => {
  try {
    const agents = await Agent.find({ sponseredId: req.params.mobile });
    res.status(200).json({
      success: true,
      agents: agents,
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

exports.loginAgent = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const agent = await Agent.findOne({ email }).select("+password");

    const name = agent.name;
    const agentid = agent._id;
    const mobile = agent.mobile;
    if (!agent) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    const isPasswordMatched = await agent.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    res.status(201).json({
      success: true,
      name,
      agentid,
      mobile,
      email,
      agent,
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

exports.agentLoginAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const agent = await Agent.findOne({ email }).select("+password");
    const name = agent.name;
    const agentid = agent._id;

    if (!agent) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    const isPasswordMatched = await agent.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    res.status(201).json({
      success: true,
      name,
      email,
      agentid,
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

exports.coversion = catchAsyncErrors(async (req, res, next) => {
  try {
    let agent = await Agent.findOne({ referCode: req.params.refercode });

    if (!agent) {
      return res.status(500).json({
        success: false,
        message: "address not found",
      });
    }
    const agentid = agent._id;
    return res.status(200).json({
      success: true,
      agentid,
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
    let agent = await Agent.findOne({ mobile: req.params.mobile });

    if (!agent) {
      return res.status(200).json({
        success: false,
        message: "new Mobile",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mobile Number already exist",
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
    let agent = await Agent.findOne({ email: req.params.email });

    if (!agent) {
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
exports.adharcardExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let agent = await Agent.findOne({
      "personalId.adharCard": req.params.adharcard,
    });

    if (!agent) {
      return res.status(500).json({
        success: false,
        message: "new adharcard",
      });
    }

    return res.status(200).json({
      success: true,
      message: " adharcard already exist",
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
exports.pancardExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let agent = await Agent.findOne({
      "personalId.panCard": req.params.pancard,
    });

    if (!agent) {
      return res.status(500).json({
        success: false,
        message: "new pancard",
      });
    }

    return res.status(200).json({
      success: true,
      message: " pancard already exist",
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
exports.refercodeExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let agent = await Agent.findOne({ referCode: req.params.refercode });

    if (!agent) {
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

exports.UploadAdhar = catchAsyncErrors(async (req, res, next) => {
  try {
    const adhar = await cloudinary.v2.uploader.upload(req.body.adhar, {
      folder: "Agent/AdharCard",
      width: 150,
      crop: "scale",
    });

    const adharcard = adhar.secure_url;

    res.status(200).json({
      success: true,
      adharcard,
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

exports.UploadPan = catchAsyncErrors(async (req, res, next) => {
  try {
    const pan = await cloudinary.v2.uploader.upload(req.body.pan, {
      folder: "Agent/PanCard",
      width: 150,
      crop: "scale",
    });

    const pancard = pan.secure_url;

    res.status(200).json({
      success: true,
      pancard,
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

exports.UploadAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    const avatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Agent/Avatar",
      width: 150,
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

exports.UpdateAgent = catchAsyncErrors(async (req, res, next) => {
  try {
    let agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(500).json({
        success: false,
        message: "agent not found",
      });
    }
    agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      agent: agent,
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


exports.UpdateAgentbymobile = catchAsyncErrors(async (req, res, next) => {
  try {
    let agent = await Agent.findOne({mobile:req.params.mobile});;
    if (!agent) {
      return res.status(500).json({
        success: false,
        message: "agent not found",
      });
    }
    agent = await Agent.findByIdAndUpdate(agent._id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      agent: agent,
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



exports.agentdetailbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let agent = await Agent.find({mobile:req.params.mobile});
    if (!agent) {
      return res.status(500).json({
        success: false,
        message: "agent not found",
      });
    }
   
    res.status(200).json({
      success: true,
      agent: agent,
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

exports.otpVerify = catchAsyncErrors(async (req, res, next) => {
  try {
    request(req.body);
    res.status(200).json({
      success: true,
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

exports.UpdateAgentAll = catchAsyncErrors(async (req, res, next) => {
  try {
    let agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(500).json({
        success: false,
        message: "agent not found",
      });
    }
    agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      agent: agent,
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
