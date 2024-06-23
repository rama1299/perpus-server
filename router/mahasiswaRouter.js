const express = require('express')
const MahasiswaController = require('../controllers/mahasiswaController')

const router = express.Router()

router
    .get('/mahasiswa', MahasiswaController.getData)
    .get('/mahasiswa/daftar-nama', MahasiswaController.getNama)
    .post('/mahasiswa', MahasiswaController.createData)

module.exports = router