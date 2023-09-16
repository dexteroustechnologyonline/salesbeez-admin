const Agent = require("../models/agentModel");
const Commission = require("../models/commissionModel");
const Groceryorder = require("../models/groceryOrderModel");
const BussinessHistory = require("../models/bussinessHistoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


exports.UpdateOrderProccessing = catchAsyncErrors(async (req, res, next) => {
    try {
        let orderDetails = await Groceryorder.findById(req.params.id);
        if (orderDetails.orderStatus === 4) {

            orderDetails = await Groceryorder.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    useFindAndModify: false,
                    runValidators: true,
                }
            );

            const agenttotal = await Agent.find();

            if (!orderDetails) {
                return res.status(500).json({
                    success: false,
                    message: "orderDetails not found",
                });
            }

            let agentCommission = [
                { position: "Marketing Executive", commission: 5 },
                { position: "Marketing Manager", commission: 7.5 },
                { position: "Sr.Marketing Manager", commission: 9.5 },
                { position: "Asst. General Manager", commission: 11 },
                { position: "Deputy General Manager", commission: 12 },
                { position: "General Manager", commission: 12.5 },
            ];
            let agentUpperCommission = [
                { position: "Marketing Executive", commission: 5 },
                { position: "Marketing Manager", commission: 2.5 },
                { position: "Sr.Marketing Manager", commission: 2 },
                { position: "Asst. General Manager", commission: 1.5 },
                { position: "Deputy General Manager", commission: 1 },
                { position: "General Manager", commission: 0.5 },
            ];

            let agentId = orderDetails.agentId;
            let clientId = orderDetails.clientId;
            let totalOrderAmount = orderDetails.totalAmount;
            let clientMobile = orderDetails.clientPhone;

            // ===================== primary agent commision  =====================

            // let agents = agenttotal.find((agent) => agent.mobile === agentId);
            let agents = await Agent.findOne({ mobile: agentId });

            let agtPosition = agents.position;
            const primaryAgenrBusiness = agents.business;
            const numberofOrders = agents.numberofOrders + 1;
            const totalSales = agents.totalSales + totalOrderAmount;
            const business = agents.business + totalOrderAmount;
            const agentbusiness = agents.agentbusiness + totalOrderAmount;

            let commission = agentCommission.find(
                (agentc) => agentc.position === agtPosition
            ).commission;
            const uppercommissionidex = agentUpperCommission.findIndex(
                (agentc) => agentc.position === agtPosition
            );
            let totalcommition = Math.round((totalOrderAmount * commission) / 100);

            let agentFormdata = {
                clientId: clientId,
                agentId: agentId,
                groceryorderId: orderDetails._id,
                commission: totalcommition,
                commissionPercentage: String(commission),
            };

            const createCommission = await Commission.create(agentFormdata);

            // =====================End of primary agent commision  =====================

            // ===================== primary agent Business update =====================

            try {
                if (
                    agtPosition === "Marketing Executive" &&
                    agents.agentbusiness >= 20000
                ) {
                    agtPosition = "Marketing Manager";
                    await meToMM(agents);
                } else if (agtPosition === "Marketing Executive") {
                    let count = await Agent.find({ sponseredId: agents.mobile }).length;

                    if (count >= 10) {
                        agtPosition = "Marketing Manager";
                        await meToMM(agents);
                    } else if (agents.business >= 20000 && count >= 5) {
                        agtPosition = "Marketing Manager";
                        await meToMM(agents);
                    }
                }
            } catch (error) { }

            let bussinessForm = {
                agentId: agentId,
                groceryorderId: orderDetails._id,
                previousBussiness: agents.business,
                currentBussiness: business,
                previousAgentBussiness: agents.agentbusiness,
                currentAgentBussiness: agentbusiness,
                previousAgentDownlineBussiness: agents.downlineagentbusiness,
                currentAgentDownlineBussiness: agents.downlineagentbusiness,
                previousPosition: agents.position,
                currentPosition: agents.position,
                orderAmount: totalOrderAmount,
            };

            const bussinessHistory = await BussinessHistory.create(bussinessForm);

            let agentUpdateform = {
                numberofOrders: numberofOrders,
                totalSales: totalSales,
                business: business,
                agentbusiness: agentbusiness,
                mobile: agentId,
                position: agtPosition,
            };
            let agent = await Agent.findOne({ mobile: agentUpdateform.mobile });
            if (!agent) {
                return res.status(500).json({
                    success: false,
                    message: "agent not found",
                });
            }

            agent = await Agent.findByIdAndUpdate(agent._id, agentUpdateform, {
                new: true,
                useFindAndModify: false,
                runValidators: true,
            });
            // =====================End of primary agent Business update =====================

            // ===================== primary agent sponcer Business update if ME=====================

            const directSponcerId = agents.sponseredId;
            const directSponcer = await agenttotal.find(
                (curAgent) => curAgent.mobile === directSponcerId
            );
            try {
                if (
                    String(directSponcer.position) === "Marketing Executive" &&
                    String(clientMobile) === String(agentId)
                ) {
                    let psPosition = "Marketing Executive";
                    const business = directSponcer.business + totalOrderAmount;
                    const downlineagentbusiness =
                        directSponcer.downlineagentbusiness + totalOrderAmount;
                    const numberofDownlineOrders = directSponcer.numberofDownlineOrders + 1;

                    if (directSponcer.agentbusiness >= 20000) {
                        psPosition = "Marketing Manager";
                        await meToMM(directSponcer);
                    } else {
                        let count = await Agent.find({ sponseredId: directSponcer.mobile })
                            .length;

                        if (count >= 10) {
                            psPosition = "Marketing Manager";
                            await meToMM(directSponcer);
                        } else if (directSponcer.business >= 20000 && count >= 5) {
                            psPosition = "Marketing Manager";
                            await meToMM(directSponcer);
                        }
                    }

                    let agentUpdateform = {
                        numberofDownlineOrders: numberofDownlineOrders,
                        business: business,
                        downlineagentbusiness: downlineagentbusiness,
                        mobile: directSponcer.mobile,
                        position: psPosition,
                    };
                    let agent = await Agent.findOne({ mobile: agentUpdateform.mobile });
                    if (!agent) {
                        return res.status(500).json({
                            success: false,
                            message: "agent not found",
                        });
                    }

                    agent = await Agent.findByIdAndUpdate(agent._id, agentUpdateform, {
                        new: true,
                        useFindAndModify: false,
                        runValidators: true,
                    });

                    let bussinessForm = {
                        agentId: directSponcer.mobile,
                        groceryorderId: orderDetails._id,
                        previousBussiness: directSponcer.business,
                        currentBussiness: business,
                        previousAgentBussiness: directSponcer.agentbusiness,
                        currentAgentBussiness: directSponcer.agentbusiness,
                        previousAgentDownlineBussiness: directSponcer.downlineagentbusiness,
                        currentAgentDownlineBussiness: downlineagentbusiness,
                        previousPosition: directSponcer.position,
                        currentPosition: directSponcer.position,
                        orderAmount: totalOrderAmount,
                    };

                    const bussinessHistory = await BussinessHistory.create(bussinessForm);
                }
            } catch (error) { }

            // ===================== End primary agent sponcer Business update if ME =====================

            // ===================== uplink agent Business update =====================

            let currentAgent = agents;
            let currentSponcer = "";
            try {
                for (let i = uppercommissionidex + 1; i < 6; i++) {
                    currentSponcer = await agenttotal.find(
                        (curAgent) => curAgent.mobile === currentAgent.sponseredId
                    );

                    while (String(currentSponcer.position) === "Marketing Executive") {
                        currentAgent = currentSponcer;
                        currentSponcer = await agenttotal.find(
                            (curAgent) => curAgent.mobile === currentAgent.sponseredId
                        );
                    }

                    const business = currentSponcer.business + totalOrderAmount;
                    try {
                        if (business >= 200000) {
                            await checkMMPromotion(currentSponcer);
                        }
                    } catch (error) { }

                    const downlineagentbusiness =
                        currentSponcer.downlineagentbusiness + totalOrderAmount;
                    const numberofDownlineOrders =
                        currentSponcer.numberofDownlineOrders + 1;
                    let agentUpdateform = {
                        numberofDownlineOrders: numberofDownlineOrders,
                        business: business,
                        downlineagentbusiness: downlineagentbusiness,
                        mobile: currentSponcer.mobile,
                    };

                    let agent = await Agent.findOne({ mobile: agentUpdateform.mobile });
                    if (!agent) {
                        return res.status(500).json({
                            success: false,
                            message: "agent not found",
                        });
                    }

                    agent = await Agent.findByIdAndUpdate(agent._id, agentUpdateform, {
                        new: true,
                        useFindAndModify: false,
                        runValidators: true,
                    });

                    let bussinessForm = {
                        agentId: currentSponcer.mobile,
                        groceryorderId: orderDetails._id,
                        previousBussiness: currentSponcer.business,
                        currentBussiness: business,
                        previousAgentBussiness: currentSponcer.agentbusiness,
                        currentAgentBussiness: currentSponcer.agentbusiness,
                        previousAgentDownlineBussiness: currentSponcer.downlineagentbusiness,
                        currentAgentDownlineBussiness: downlineagentbusiness,
                        previousPosition: currentSponcer.position,
                        currentPosition: currentSponcer.position,
                        orderAmount: totalOrderAmount,
                    };

                    const bussinessHistory = await BussinessHistory.create(bussinessForm);

                    let upperCommissionPercentage = agentUpperCommission[i].commission;

                    const uppercommissionidex2 = agentUpperCommission.findIndex(
                        (agentc) => agentc.position === currentSponcer.position
                    );

                    let extraCommissionPercentage = 0;
                    if (uppercommissionidex2 > i) {
                        for (let index = i; index < uppercommissionidex2; index++) {
                            extraCommissionPercentage =
                                extraCommissionPercentage +
                                agentUpperCommission[index + 1].commission;
                        }
                        i = uppercommissionidex2;
                    }

                    upperCommissionPercentage =
                        upperCommissionPercentage + extraCommissionPercentage;
                    let totalcommition = Math.round(
                        (totalOrderAmount * upperCommissionPercentage) / 100
                    );

                    let agentFormdata = {
                        clientId: clientId,
                        agentId: currentSponcer.mobile,
                        groceryorderId: orderDetails._id,
                        totalSales: currentSponcer.totalSales + totalOrderAmount,
                        commission: totalcommition,
                        commissionPercentage: String(upperCommissionPercentage),
                    };
                    const createCommission = await Commission.create(agentFormdata);

                    currentAgent = currentSponcer;
                }
            } catch (error) { }

            const meToMM = async (agent) => {
                try {
                    let currentAgent = agent;

                    let currentSponcer = "";

                    for (let i = 1; i < 6; i++) {
                        currentSponcer = await agenttotal.find(
                            (curAgent) => curAgent.mobile === currentAgent.sponseredId
                        );
                        let numberMM = 0;
                        let numberME = 0;

                        numberMM = currentSponcer.numberMM + 1;
                        numberME = currentSponcer.numberME - 1;

                        const SponcerformData = {
                            numberME: numberME,
                            numberMM: numberMM,
                            _id: currentSponcer._id,
                        };

                        let agent = await Agent.findById(currentSponcer._id);
                        if (!agent) {
                            return res.status(500).json({
                                success: false,
                                message: "agent not found",
                            });
                        }

                        agent = await Agent.findByIdAndUpdate(
                            currentSponcer._id,
                            SponcerformData,
                            {
                                new: true,
                                useFindAndModify: false,
                                runValidators: true,
                            }
                        );

                        currentAgent = currentSponcer;
                    }
                } catch (error) { }
            };

            const checkMMPromotion = async (agent) => {
                const downlines = await Agent.find({ sponseredId: agent.mobile });
                if (downlines.payload.length > 0) {
                    const sponcerDownline = downlines.payload;
                    let mmCount = 0;
                    for (let index = 0; index < sponcerDownline.length; index++) {
                        const downline = sponcerDownline[index];
                        if (
                            downline.position === "Marketing Manager" ||
                            downline.numberMM > 0
                        ) {
                            mmCount++;
                        }
                    }
                    if (mmCount >= 5) {
                        const formData = {
                            positionStatus: 3,
                            position: "Sr.Marketing Manager",
                            mobile: agent.mobile,
                        };

                        let agent = await Agent.findOne({ mobile: formData.mobile });
                        if (!agent) {
                            return res.status(500).json({
                                success: false,
                                message: "agent not found",
                            });
                        }

                        agent = await Agent.findByIdAndUpdate(agent._id, formData, {
                            new: true,
                            useFindAndModify: false,
                            runValidators: true,
                        });
                        mMToSMM(agent);
                    }
                }
            };

            const mMToSMM = async (agent) => {
                try {
                    let currentAgent = agent;

                    let currentSponcer = "";

                    for (let i = 1; i < 6; i++) {
                        currentSponcer = await agenttotal.find(
                            (curAgent) => curAgent.mobile === currentAgent.sponseredId
                        );

                        let numberSMM = 0;
                        let numberMM = 0;

                        numberSMM = currentSponcer.numberSMM + 1;
                        numberMM = currentSponcer.numberMM - 1;

                        const SponcerformData = {
                            numberMM: numberMM,
                            numberSMM: numberSMM,
                            _id: currentSponcer._id,
                        };

                        let agent = await Agent.findById(currentSponcer._id);
                        if (!agent) {
                            return res.status(500).json({
                                success: false,
                                message: "agent not found",
                            });
                        }

                        agent = await Agent.findByIdAndUpdate(
                            currentSponcer._id,
                            SponcerformData,
                            {
                                new: true,
                                useFindAndModify: false,
                                runValidators: true,
                            }
                        );

                        currentAgent = currentSponcer;
                    }
                } catch (error) { }
            };


        }
        res.status(200).json({
            success: true,
            groceryorder: orderDetails,
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