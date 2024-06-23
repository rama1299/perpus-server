const {pool} = require('../conn/conn')

class TransaksiPinjamanController {
    static async createData(req, res, next) {
        let client = await pool.connect()
        try {
            await client.query('BEGIN')

            let { nim, tanggal_pinjam, tanggal_kembali, ids_buku } = req.body

            if (!nim) {
                throw {name: 'ValidasiNim'}
            }

            if (!tanggal_pinjam) {
                throw {name: 'ValidasiTanggalPinjam'}
            }

            if (!tanggal_kembali) {
                throw {name: 'ValidasiTanggalKembali'}
            }
            
            let dateAwal = new Date(tanggal_pinjam);
            let dateAkhir = new Date(tanggal_kembali);

            if (dateAwal >= dateAkhir) {
                throw {name: 'ValidasiLamaPinjam'}
            }
            
            let selisih = Math.abs(dateAkhir - dateAwal);
            
            let lama_pinjam = Math.ceil(selisih / (1000 * 60 * 60 * 24));
            
            if (lama_pinjam > 14) {
                throw {name: 'ValidasiLamaPinjam'}
            }

            const cekStatusMahasiswa = await client.query(
                `select status_aktif from master_mahasiswa where nim = '${nim}'`
            )

            if (cekStatusMahasiswa.rows.length == 0) {
                throw {name: 'ValidasiNimTidakTerdaftar'}
            }

            if (cekStatusMahasiswa.rows[0].status_aktif == false) {
                throw {name: 'ValidasiStatusMahasiswa'}
            }

            if (ids_buku.length == 0) {
                throw {name: 'ValidasiIdsBuku'}
            }

            const insertTransaksi = await client.query(
                `insert into transaksi_peminjaman (nim, tanggal_pinjam, tanggal_kembali, lama_pinjam)
                values('${nim}', '${tanggal_pinjam}', '${tanggal_kembali}', '${lama_pinjam}')
                RETURNING id_transaksi`
            )

            if (insertTransaksi.rowCount == 0) {
                throw {name: 'ProsesGagal'}
            }

            const id_transaksi = insertTransaksi.rows[0].id_transaksi

            for (let i = 0; i < ids_buku.length; i++) {
                const id_buku = ids_buku[i];

                if (!id_buku) {
                    throw {name: 'ValidasiIdBuku'}
                }

                const cekStokBuku = await client.query(
                    `select * from rak_inventory_stok_buku where id_buku = '${id_buku}' order by id_stok asc limit 1`
                )

                if (cekStokBuku.rows.length == 0) {
                    const getNamaBuku = await client.query(
                        `select nama_buku from master_buku where id_buku = '${id_buku}'`
                    )

                    throw {name: 'ValidasiStokBuku', data:{nama_buku: getNamaBuku.rows[0].nama_buku}}
                }

                if (cekStokBuku.rows[0].jumlah_stok == 0) {
                    const getNamaBuku = await client.query(
                        `select nama_buku from master_buku where id_buku = '${id_buku}'`
                    )

                    throw {name: 'ValidasiStokBuku', data:{nama_buku: getNamaBuku.rows[0].nama_buku}}                }   
                
                const id_stok = cekStokBuku.rows[0].id_stok

                const insertTransaksiDetail = await client.query(
                    `insert into transaksi_peminjaman_detail (id_transaksi, id_buku) values ('${id_transaksi}', '${id_buku}')`
                )

                if (insertTransaksiDetail.rowCount == 0) {
                    throw {name: 'ProsesGagal'}
                }

                const insertHistoryPeminjaman = await client.query(
                    `insert into history_peminjaman (nim, id_buku, tanggal_pinjam, tanggal_kembali, lama_pinjam)
                    values ('${nim}', '${id_buku}', '${tanggal_pinjam}', '${tanggal_kembali}', '${lama_pinjam}')`
                )

                if (insertHistoryPeminjaman.rowCount == 0) {
                    throw {name: 'ProsesGagal'}
                }

                const updateStokBuku = await client.query(
                    `update rak_inventory_stok_buku set jumlah_stok = jumlah_stok - 1 where id_buku = '${id_buku}' and id_stok = '${id_stok}'`
                )
                
                if (updateStokBuku.rowCount == 0) {
                    throw {name: 'ProsesGagal'}
                }

            }

            await client.query('COMMIT')

            res.status(200).json({message: 'sukses', data: []})
            
        } catch (error) {
            await client.query('ROLLBACK')
            console.error(error)
            next(error)
        } finally {
            client.release()
        }
    }
    static async getData(req, res, next) {
        let client = await pool.connect()
        try {

            const resp = await client.query(
                `select * from transaksi_peminjaman`
            )

            if (resp.rows.length == 0) {
                throw {name: 'ErrorNotFound'}
            }

            let data = resp.rows

            res.status(200).json({message: 'sukses', data})
            
        } catch (error) {
            console.error(error)
            next(error)
        } finally {
            client.release()
        }
    }
}

module.exports = TransaksiPinjamanController