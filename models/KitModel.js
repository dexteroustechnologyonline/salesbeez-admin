const mongoose = require("mongoose");

const kitSchema = new mongoose.Schema({

    kitName: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: [true, "Please provide thumbnail"],
    },
    sellingPrice: {
        type: Number,
    },

    products: [
        {
            type: String
        }
    ],

    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Kit", kitSchema);