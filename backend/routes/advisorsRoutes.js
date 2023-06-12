const advisorsControllers = require('../controllers/advisorsControllers')
const router = require('express').Router()

// route - /api/advisors/
router
    .route('/')
    .get(advisorsControllers.getAllAdvisors)
    .post(advisorsControllers.createNewAdvisor)

// route - /api/advisors/id
router
    .route('/:id')
    .put(advisorsControllers.updateAdvisorById)
    .delete(advisorsControllers.deleteAdvisorById)

module.exports = router