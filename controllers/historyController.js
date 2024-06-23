const {pool} = require('../conn/conn')

class HistoryController {
    static async getData(req, res, next) {
        let client = await pool.connect();
        try {
            let { nim, id_buku, tanggal_pinjam, tanggal_kembali, lama_pinjam } = req.query;
    
            let queryFilterParts = [];
            if (nim) queryFilterParts.push(`hp.nim = '${nim}'`);
            if (id_buku) queryFilterParts.push(`hp.id_buku = '${id_buku}'`);
            if (tanggal_pinjam) queryFilterParts.push(`hp.tanggal_pinjam = '${tanggal_pinjam}'`);
            if (tanggal_kembali) queryFilterParts.push(`hp.tanggal_kembali = '${tanggal_kembali}'`);
            if (lama_pinjam) queryFilterParts.push(`hp.lama_pinjam = '${lama_pinjam}'`);
    
            let queryFilter = queryFilterParts.length > 0 ? queryFilterParts.join(' AND ') : '';
    
            let queryConditional = queryFilter ? `WHERE ${queryFilter}` : '';
    
            let query = `
                SELECT hp.id_history, hp.nim, hp.id_buku, mm.nama_mahasiswa, mb.nama_buku, hp.tanggal_pinjam, hp.tanggal_kembali, hp.lama_pinjam
                FROM history_peminjaman hp
                LEFT JOIN master_mahasiswa mm ON hp.nim = mm.nim
                LEFT JOIN master_buku mb ON hp.id_buku = mb.id_buku
                ${queryConditional}`;
            console.log(query)
    
            const resp = await client.query(query);
    
            if (resp.rows.length == 0) {
                throw { name: 'ErrorNotFound' };
            }
    
            const data = resp.rows;
    
            res.status(200).json({ message: 'sukses', data });
    
        } catch (error) {
            console.error(error);
            next(error);
        } finally {
            client.release();
        }
    }
    
}

module.exports = HistoryController