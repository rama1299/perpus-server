const {pool} = require('../conn/conn')

class DashboardController {
    static async getTotalData(req, res, next) {
        const client = await pool.connect()
        try {
            const resTotalData = await client.query(
                `select
                (select count(*) from master_mahasiswa) as total_mahasiswa,
                (select count(*) from master_buku) as total_buku,
                (select count(*) from transaksi_peminjaman) as total_transaksi,
                (select count(*) from transaksi_peminjaman_detail) as total_buku_dipinjam,
				(select sum(jumlah_stok) from rak_inventory_stok_buku) as total_stok;`
            )

            const data = resTotalData.rows

            res.status(200).json({message: 'sukses', data})
        } catch (error) {
            console.error(error)
            next(error)
        } finally {
            client.release()
        }
    }
}

module.exports = DashboardController