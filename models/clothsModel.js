const mongoose = require("mongoose");

const clothsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter cloth name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  superCategory: {
    type: String,
    required: [true, "Please enter supercategory name"],
  },
  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "supercategoryid Require"],
    ref: "Supercategory",
  },

  category: {
    type: String,
    required: [true, "Please enter Category Name "],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Require"],
    ref: "Category",
  },
  subCategory: {
    type: String,
    required: [true, "Please enter subCategory name"],
  },
  subCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "subCategoryId Require"],
    ref: "Subcategory",
  },
  brand: {
    type: String,
    required: [true, "Please enter brand name"],
  },
  tags: {
    universatTag: {
      type: String,
      default: "",
    },
    superCategoryTag: {
      type: String,
      default: "",
    },
    categoryTag: {
      type: String,
      default: "",
    },
    subCategoryTag: {
      type: String,
      default: "",
    },
  },
  details: {
    type: String,
    required: [true, "Please provide details "],
  },
  design: {
    type: String,
    required: [true, "Please provide design"],
  },

  material: {
    type: String,
  },
  metaTitle:{
    type:String,
    default:"",
    trim:true,
  },
  metaKeyword:{
    type:String,
    default:"",
    trim:true,
  },
  metaDesc:{
    type:String,
    default:"",
    trim:true,
  },
  hot: {
    type: Boolean,
    // required: [true, "Please provide hotProducts"],
  },
  trending: {
    type: Boolean,
    default: false,
  },
  outOfStock: {
    type: Boolean,
    default: false,
  },
  offers: {
    type: Boolean,
    default: false,
  },
  options: [
    {
      optionName: {
        type:String,
        required:[true, "Please provide optionName"],
      },
      skuCode:String,
      barcode:String,
      color: [
        {
          type: String,
        },
      ],
      sizes: {
        S: {
          type: Boolean,
          default: false,
        },
        M: {
          type: Boolean,
          default: false,
        },
        L: {
          type: Boolean,
          default: false,
        },
        XL: {
          type: Boolean,
          default: false,
        },
        XXL: {
          type: Boolean,
          default: false,
        },
        XXXL: {
          type: Boolean,
          default: false,
        },
        XXXXL: {
          type: Boolean,
          default: false,
        },
      },
      specifications: {
        type: String,
        // required: [true, "Please provide specifications "],
      },
      thumbnail: {
        type: String,
        // required: [true, "Please provide thumbnail"],
      },
      icon: {
        type: String,
        // required: [true, "Please provide icon"],
      },
      desktopicon: {
        type: String,
        // required: [true, "Please provide desktopicon"],
      },
      productSlider: [
        {
          type: String,
          // required: [true, "Please provide productSlider"],
        },
      ],
      costPrice: {
        type: Number,
        default: 0,
      },
      gstCost: {
        type: Number,
        required: [true, "Please provide gstCost"],
        default: 0,
      },
      sellingPrice: {
        type: Number,
        required: [true, "Please provide sellingPrice"],
      },
      gstSellPrice: {
        type: Number,
        required: [true, "Please provide gstSellPrice"],
        default: 0,
      },
      mrp: {
        type: Number,
        required: [true, "Please provide mrp"],
      },
      discounts: {
        type: Number,
        // required: [true, "Please provide discounts"],
      },
      cartQuantity: {
        type: Number,
        default:0,
      },
      prime: {
        type: Boolean,
        default:false,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cloths", clothsSchema);
