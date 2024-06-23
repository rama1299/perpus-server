const express = require('express')
const InventoryController = require('../controllers/inventoryController')
const router = express.Router()

router
    .get('/inventory', InventoryController.getData)
    .post('/inventory', InventoryController.createData)
module.exports = router