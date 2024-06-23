
# Perpustakaan

Adalah aplikasi untuk manajemen perpustakaan.

## Persyaratan

Sebelum menginstal dan menjalankan aplikasi ini, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi X.X.X atau lebih baru)
- [NPM](https://www.npmjs.com/) (termasuk dengan Node.js)
- [PostgreSQL](https://www.postgresql.org/)

## Instalasi

Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan aplikasi:

1. Clone repositori ini ke mesin lokal Anda:

   ```sh
   git clone https://github.com/rama1299/perpus-server.git

2. masuk ke direktori:

   ```sh
   cd perpus-server

3. install package:

   ```sh
   npm install

4. install database yang di sediakan

5. atur .env contoh ada di .env example:

   ```sh
   PORT=8080
   DB_USER='postgres'
   DB_PORT=5432
   DB_PASS='postgres'
   DB_HOST='localhost'
   DB_NAME='perpustakaan'

3. jalanakan aplikasi:

   ```sh
   npm run dev
