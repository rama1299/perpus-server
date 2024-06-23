const { pool } = require('../conn/conn')

class MahasiswaController {
    static async getData(req, res, next) {
        let client = await pool.connect()
        try {

            const search = req.query.search
            const page = req.query.page || 1
            const limit = req.query.limit || 10
            const offset = (page - 1) * limit

            let query = `
            select * from master_mahasiswa
            `
            
            let queryPagination = `
            limit ${limit} offset ${offset}
            `

            let queryConditional = ``

            if (search) {
                queryConditional += `
                where (
                    nim ilike '%${search}%' or
                    nama_mahasiswa ilike '%${search}%' or
                    alamat ilike '%${search}%' or
                    program_studi ilike '%${search}%'
                )`
            }
            const resp = await client.query(query + queryConditional + queryPagination)

            if (resp.rows.length == 0) {
                throw {name: 'ErrorNotFound'}
            }
            
            const resTotalData = await client.query(
                `select count(*) as totaldata from (${query + queryConditional}) as data`
            )

            const total_data = parseFloat(resTotalData.rows[0].totaldata)

            const total_pages = Math.ceil(total_data / limit)

            res.status(200).json({message: 'sukses', total_data, total_pages, page, data: resp.rows })
        } catch (error) {
            console.error(error)
            next(error)
        } finally {
            client.release()
        }
    }
    static async getNama(req, res, next) {
        let client = await pool.connect()
        try {

            let query = `
            select nim, nama_mahasiswa from master_mahasiswa
            `
        
            const resp = await client.query(query)

            if (resp.rows.length == 0) {
                throw {name: 'ErrorNotFound'}
            }

            res.status(200).json({message: 'sukses', data: resp.rows })
        } catch (error) {
            console.error(error)
            next(error)
        } finally {
            client.release()
        }
    }
    static async createData(req, res, next) {
        let client = await pool.connect()
        try {

            let { nim, nama_mahasiswa, program_studi, tanggal_lahir, alamat } = req.body

            if (!nim || !nama_mahasiswa) {
                throw {name: 'ValidasiNimNamaMahasiswa'}
            }

            const cekNim = await client.query(
                `select * from master_mahasiswa where nim = '${nim}'`
            )

            if (cekNim.rows.length > 0) {
                throw {name: 'NimAlreadyExist'}
            }

            const resp = await client.query(
                `INSERT INTO master_mahasiswa (nim, nama_mahasiswa, program_studi, tanggal_lahir, alamat, status_aktif)
                VALUES ('${nim}', '${nama_mahasiswa}', '${program_studi}', '${tanggal_lahir}', '${alamat}', 'true')`
            )

            if (resp.rowCount == 0) {
                throw {name: 'GagalMenambahkanData'}
            }

            res.status(200).json({message: 'sukses', data: [] })
        } catch (error) {
            console.error(error)
            next(error)
        } finally {
            client.release()
        }
    }
}

module.exports = MahasiswaController