const mongoose = require("mongoose");

const bussinessHistorySchema = new mongoose.Schema({
    agentId: {
        type: String,
        required: true,
    },

    groceryorderId: {
        type: mongoose.Schema.ObjectId,
        ref: "Groceryorder",
    },

    orderAmount: {
        type: String,
        required: true,
    },
    previousBussiness: {
        type: String,
        required: true,
    },
    currentBussiness: {
        type: String,
        required: true,
    },
    previousAgentBussiness: {
        type: String,
        required: true,
    },
    currentAgentBussiness: {
        type: String,
        required: true,
    },
    previousAgentDownlineBussiness: {
        type: String,
        required: true,
    },
    currentAgentDownlineBussiness: {
        type: String,
        required: true,
    },
    previousPosition: {
        type: String,
        required: true,
    },
    currentPosition: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("BussinessHistory", bussinessHistorySchema);