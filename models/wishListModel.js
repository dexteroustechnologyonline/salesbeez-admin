const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  clientId: {
   
    type: mongoose.Schema.ObjectId,
    ref: "Client",
    required: true,
  },
  optionName:
  {
      type: String,
      required:[true, "Please provide optionName"],
  },
  category: {
    type: String,
    required: [true, "Please enter Category Name"],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Require"],
    ref: "Category",
  },
  productid: {
    type: mongoose.Schema.ObjectId,
    required: [true, "product Id Require"],
    ref: "Grocery",
  },
  productName: {
    type: String,
     required: true,
  },
  cartQuantity: {
    type: Number,
    required: true,
    default:1,
  },
  mrp: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  totalMrp: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discount:{
    type: Number,
    // required: true,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    // required: true,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
    default:"Brand"
  },
  totalcashback:
  {
    type: Number,
    // required: true,
    default: 0,
  },
  cashbackstatus:{
      type: Boolean,
      default:false
  },
    
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("wishlist", wishlistSchema);
