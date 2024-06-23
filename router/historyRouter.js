const express = require('express')
const HistoryController = require('../controllers/historyController')
const router = express.Router()

router
    .get('/history', HistoryController.getData)

module.exports = router