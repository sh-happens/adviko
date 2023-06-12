const Advisor = require('../models/Advisor')
const asyncHandler = require('../middleware/asyncHandler') 

exports.getAllAdvisors = asyncHandler(async (req, res,  next) => {
    const advisor = await Advisor.find()

    res.status(200).json({
        success: true,
        data: advisor
    })
})

exports.createNewAdvisor = asyncHandler(async (req, res, next) => {
    res.send('Create new advisor route')
})

exports.updateAdvisorById = asyncHandler(async (req, res, next) => {
    res.send("Update an advisor by id route")
})

exports.deleteAdvisorById = asyncHandler(async(req, res, next) => {
    res.send("Delete an advisor by id route")
})