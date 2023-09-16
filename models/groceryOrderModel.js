const mongoose = require("mongoose");

const groceryOrderSchema = mongoose.Schema(
  {
    agentId: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.ObjectId,
      ref: "Client",
      required: true,
    },
    clientname: {
      type: String,
    },
    clientEmail: {
      type: String,
      default: "salesbeezdm@gmail.com",
    },

    clientPhone: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    netPayable: {
      type: Number,
      required: true,
      default: 0,
    },

    orderproducts: [
      {
        optionName: {
          type: String,
          required: [true, "Please provide optionName"],
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
          default: 1,
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
        discount: {
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
          default: "Brand",
        },
        totalcashback: {
          type: Number,
          // required: true,
          default: 0,
        },
        cashbackstatus: {
          type: Boolean,
          default: false,
        },
      },
    ],

    deliverCharge: {
      type: Number,
      // // required: true,
      default: 0,
    },
    walletAmountUsed: {
      type: Number,
      // // required: true,
      default: 0,
    },
    saving: {
      type: Number,
      // // required: true,
      default: 0,
    },
    cashback: {
      type: Number,
      default: 0,
    },

    itemCount: {
      type: Number,
      required: true,
      default: 0,
    },
    packCount: {
      type: Number,
      required: true,
      default: 0,
    },

    orderStatus: {
      type: Number,
      default: 1,
    },
    statusText: {
      type: String,
      default: "Order Recieved",
    },

    // Shipping Information
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
        default: "",
      },
      country: {
        type: String,
        default: "India",
      },
      pinCode: {
        type: Number,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
    },

    // Payment Information
    paymentInfo: {
      mode: {
        type: String,
        default: "COD",
      },
      status: {
        type: String,
      },
      paidAt: Date,
    },

    // Delivery Information
    deliveryInfo: {
      deliveryManId: {
        type: mongoose.Schema.ObjectId,
      },
      deliveryManName: {
        type: String,
      },
      deliveryManPhone: {
        type: Number,
      },
      logisticspartnerName: {
        type: String,
      },
      logisticsawbnumber: {
        type: String,
      },
    },

    // Coupon Information
    couponInfo: {
      couponId: {
        type: String,
        // type: mongoose.Schema.ObjectId,
        // ref: "Coupon",
      },
      couponCode: {
        type: String,
      },
      couponTitle: {
        type: String,
      },
      couponDescription: {
        type: String,
      },
    },
    couponDis: {
      type: Number,
      // // required: true,
      default: 0,
    },
    remark: {
      BookedOrdersRemark: {
        type: String,
        default: "Your Order has been placed",
        // default: "",
      },
      OrderprocessingRemark: {
        type: String,
        default: "Team has processed your order",
      },
      OrderDispatchedRemark: {
        type: String,
        default: "Your order has been picked up by courier partner",
      },
      OutfordeliveryRemark: {
        type: String,
        default: "Your item is out for delivery",
      },
      OrderDeliveredRemark: {
        type: String,
        default: "Your item has been delivered",
      },
      OrderCancelRemark: {
        type: String,
        default: "Your delivery is cancelled",
      },
      OrderDeliveredAgentRemark: {
        type: String,
      },
    },

    OrderprocessDate: {
      OrderprocessingDate: {
        type: Date,
        // default: Date.now(),
      },
      OrderDispatchedDate: {
        type: Date,
        // default: Date.now(),
      },
      OutfordeliveryDate: {
        type: Date,
        // default: Date.now(),
      },
      OrderDeliveredDate: {
        type: Date,
        // default: Date.now(),
      },
      OrderCancelledDate: {
        type: Date,
        // default: Date.now(),
      },
      OrderCancelledDate1: {
        type: Date,
        // default: Date.now(),
      },
      // OrderprocessingDate: Date,
      // OrderDispatchedDate: Date,
      // OutfordeliveryDate: Date,
      // OrderDeliveredDate: Date,
      // OrderCancelledDate: Date,
    },
    expectedDelDate: Date,
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Groceryorder", groceryOrderSchema);
