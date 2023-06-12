exports.getAllAdvisors = (req, res,  next) => {
    res.send('Get all advisors route')
}

exports.createNewAdvisor = (req, res, next) => {
    res.send('Create new advisor route')
}

exports.updateAdvisorById = (req, res, next) => {
    res.send("Update an advisor by id route")
}

exports.deleteAdvisorById = (req, res, next) => {
    res.send("Delete an advisor by id route")
}