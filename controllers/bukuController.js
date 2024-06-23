const { pool } = require('../conn/conn')

class BukuController {
    static async getData(req, res, next) {
        let client = await pool.connect()
        try {

            const search = req.query.search
            const page = req.query.page || 1
            const limit = req.query.limit || 10
            const offset = (page - 1) * limit

            let query = `
            select * from master_buku
            `

            let queryPagination = `
            limit ${limit} offset ${offset}
            `

            let queryConditional = ``

            if (search) {
                queryConditional += `
                where (
                    nama_buku ilike '%${search}%' or
                    penulis ilike '%${search}%' or
                    penerbit ilike '%${search}%' or
                    isbn ilike '%${search}%'
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
    static async createData(req, res, next) {
        let client = await pool.connect()
        try {
            const { nama_buku, penulis, penerbit, tahun_terbit, isbn } = req.body

            if (!nama_buku) {
                throw {nama: 'ValidasiNamaBuku'}
            }

            const cekIsbn = await client.query(
                `select * from master_buku where isbn = '${isbn}'`
            )

            if (cekIsbn.rows.length > 0) {
                throw {name: 'ValidasiIsbn'}
            }

            const resp = await client.query(
                `INSERT INTO master_buku (nama_buku, penulis, penerbit, tahun_terbit, isbn)
                VALUES ('${nama_buku}', '${penulis}', '${penerbit}', '${tahun_terbit}', '${isbn}')`
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
    static async getNamaBuku(req, res, next) {
        let client = await pool.connect()
        try {

            let query = `
            select id_buku, nama_buku from master_buku
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
}

module.exports = BukuController