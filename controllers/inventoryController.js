const {pool} = require('../conn/conn')

class InventoryController {
    static async getData(req, res, next) {
        let client = await pool.connect()

        try {

            let query = `
            select ri.id_stok, ri.lokasi_rak, ri.jumlah_stok, mb.*
            from rak_inventory_stok_buku ri
            left join master_buku mb on ri.id_buku = mb.id_buku
            `

            const resp = await client.query(query)

            if (resp.rows.length == 0) {
                throw {name: 'ErrorNotFound'}
            }

            let data = resp.rows

            res.status(200).json({message: 'sukses', data })

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
            const { id_buku, lokasi_rak, jumlah_stok } = req.body

            if (!id_buku || !lokasi_rak || !jumlah_stok) {
                throw {name: 'ValidasiInventory'}
            }

            const cekStokLama = await client.query(
                `select * from rak_inventory_stok_buku where id_buku = '${id_buku}' and lokasi_rak = '${lokasi_rak}'`
            )
            
            if (cekStokLama.rows.length > 0) {
                const updateStok = await client.query(
                    `update rak_inventory_stok_buku set jumlah_stok = jumlah_stok + ${jumlah_stok} where id_buku = '${id_buku}' and lokasi_rak = '${lokasi_rak}'`
                )

                if (updateStok.rowCount == 0) {
                    throw {name: 'GagalMenambahkanData'}
                }

                return res.status(200).json({message: 'sukses', data: [] })
            }

            const resp = await client.query(
                `insert into rak_inventory_stok_buku (id_buku, lokasi_rak, jumlah_stok)
                Values ('${id_buku}', '${lokasi_rak}', '${jumlah_stok}')`
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

module.exports = InventoryController