const express = require('express')
const mahasiswaRouter = require('./mahasiswaRouter')
const bukuRouter = require('./bukuRouter')
const inventoryRouter = require('./InventoryRouter')
const transaksiRouter = require('./transaksiRouter')
const historyRouter = require('./historyRouter')
const dahsboardRouter = require('./dashboardRouter')

const router = express.Router()

router.use(mahasiswaRouter)
router.use(bukuRouter)
router.use(inventoryRouter)
router.use(transaksiRouter)
router.use(historyRouter)
router.use(dahsboardRouter)

module.exports = router