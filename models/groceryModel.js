const mongoose = require("mongoose");
const { stringify } = require("querystring");

const groceySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
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
    required: [true, "Please enter Category Name name"],
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
  about: {
    type: String,
  },
  ingredient: {
    type: String,
  },
  productInfo: {
    type: String,
  },
  hsnCode: {
    type: String,
    required: true,
  },

  dealoftheday: {
    type: Boolean,
    default: false,
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
  recommended: {
    type: Boolean,
    default: false,
  },
  multi: {
    type: Boolean,
    default: false,
    //more than one pack size then true else false
  },
  caskBack: {
    type: Boolean,
    default: false,
  },
  cartQuantity: {
    type: Number,
    default: 0,
  },

  options: [
    {
      optionName: {
        type: String,
        required: [true, "Please provide optionName"],
      },
      skuCode: String,
      barcode: String,

      thumbnail: {
        type: String,
      },
      icon: {
        type: String,
      },
      desktopicon: {
        type: String,
      },
      productSlider: [
        {
          type: String,
          required: [true, "Please provide productSlider"],
        },
      ],
      costPrice: {
        type: Number,
        default: 0,
      },
      gstCost: {
        type: Number,
        default: 0,
      },
      sellingPrice: {
        type: Number,
        required: [true, "Please provide sellingPrice"],
      },
      gstSellPrice: {
        type: Number,
        default: 0,
      },
      mrp: {
        type: Number,
        required: [true, "Please provide sellingPrice"],
      },
      discounts: {
        type: Number,
        default: 0,
      },
      cartQuantity: {
        type: Number,
        default: 0,
      },

      maximumQuantity: {
        type: Number,
        default: 15,
      },
      prime: {
        type: Boolean,
        default: false,
      },
    },
  ],

  pcb1: {
    type: Number,
    default: 1,
  },
  pcb2: {
    type: Number,
    default: 2,
  },
  pcb3: {
    type: Number,
    default: 3,
  },
  metaTitle: {
    type: String,
    default: "",
  },
  metaKeyword: {
    type: String,
    default: "",
    trim: true,
  },
  metaDesc: {
    type: String,
    default: "",
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Grocery", groceySchema);
