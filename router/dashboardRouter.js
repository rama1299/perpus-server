const express = require('express')
const DashboardController = require('../controllers/dashboardController')
const router = express.Router()

router
    .get('/dashboard/total-data-tabel', DashboardController.getTotalData)

module.exports = router