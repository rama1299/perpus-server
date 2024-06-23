const express = require('express')
const TransaksiPinjamanController = require('../controllers/transaksiPinjamanController')

const router = express.Router()

router
    .get('/transaksi', TransaksiPinjamanController.getData)
    .post('/transaksi', TransaksiPinjamanController.createData)

module.exports = router