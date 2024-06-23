const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (error.name === 'ErrorNotFound') {
        res.status(404).json({message: 'Error Not Found!', data: []})
    } else if (error.name === 'ValidasiNimNamaMahasiswa') {
        res.status(400).json({message: 'Nim dan Nama Mahasiswa harus di isi!', data: []})
    } else if (error.name === 'NimAlreadyExist') {
        res.status(400).json({message: 'Nim Sudah Terdaftar!', data: []})
    } else if (error.name === 'GagalMenambahkanData') {
        res.status(400).json({message: 'Gagal Menambahkan Data!', data: []})
    } else if (error.name === 'ValidasiNamaBuku') {
        res.status(400).json({message: 'Nama Buku harus di isi!', data: []})
    } else if (error.name === 'ValidasiInventory') {
        res.status(400).json({message: 'Buku, Lokasi dan Jumlah Stok harus di isi!', data: []})
    } else if (error.name === 'ValidasiNim') {
        res.status(400).json({message: 'Nim harus di isi!', data: []})
    } else if (error.name === 'ValidasiTanggalPinjam') {
        res.status(400).json({message: 'Tanggal Pinjam harus di isi!', data: []})
    } else if (error.name === 'ValidasiIdBuku') {
        res.status(400).json({message: 'Buku harus di isi!', data: []})
    } else if (error.name === 'ValidasiTanggalKembali') {
        res.status(400).json({message: 'Tanggal Kembali harus di isi!', data: []})
    } else if (error.name === 'ValidasiLamaPinjam') {
        res.status(400).json({message: 'Lama Pinjam Minimal 1 hari dan Maksimal 14 hari!', data: []})
    } else if (error.name === 'ValidasiNimTidakTerdaftar') {
        res.status(400).json({message: 'Nim tidak terdaftar!', data: []})
    } else if (error.name === 'ValidasiStatusMahasiswa') {
        res.status(400).json({message: 'Status Mahasiswa harus aktif!', data: []})
    } else if (error.name === 'ValidasiStokBuku') {
        res.status(400).json({message: `Stok buku ${error.data.nama_buku} kosong!`, data: []})
    } else if (error.name === 'ProsesGagal') {
        res.status(400).json({message: 'Gagal memproses data!', data: []})
    } else if (error.name === 'ValidasiIsbn') {
        res.status(400).json({message: 'Isbn sudah terdaftar!', data: []})
    } else if (error.name === 'ValidasiIdsBuku') {
        res.status(400).json({message: 'Buku harus di pilih!', data: []})
    } else {
        res.status(404).json({message: 'Internal Server Error!', data: []})
    }
}

module.exports = errorHandler