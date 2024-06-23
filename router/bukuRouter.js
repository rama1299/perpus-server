const express = require('express')
const BukuController = require('../controllers/bukuController')
const router = express.Router()

router
    .get('/buku', BukuController.getData)
    .get('/buku/daftar-nama-buku', BukuController.getNamaBuku)
    .post('/buku', BukuController.createData)
module.exports = router