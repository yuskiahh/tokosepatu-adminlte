-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Apr 2022 pada 16.57
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sepatu`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `sepatu`
--

CREATE TABLE `sepatu` (
  `id` int(11) NOT NULL,
  `gambar` varchar(30) NOT NULL,
  `merk` varchar(30) NOT NULL,
  `warna` varchar(225) NOT NULL,
  `ukuran` varchar(15) NOT NULL,
  `harga` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `sepatu`
--

INSERT INTO `sepatu` (`id`, `gambar`, `merk`, `warna`, `ukuran`, `harga`) VALUES
(1, 'nikee.jpg', 'Nike', 'navy, pink, maroon, grey, white', '37,38,39,40', '300.000 - 450.000'),
(3, 'adidas.jpg', 'Adidas', 'brown, black, white, maroon', '38,39,40,41', '300.000 - 450.000'),
(4, 'ardiles.jfif', 'Ardiles', 'black, navy, grey, maaroon', '38,39,40,41,42', '85.000 - 128.000'),
(5, 'tomkins.jfif', 'Tomkins', 'black, navy, grey, maaroon', '38,39,40,41', '160.000 - 250.000'),
(7, 'nike.jpg', 'Nike Air', 'white', '38,39,40,41', '350.000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(15) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `phone` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `nama`, `phone`) VALUES
(1, 'yuskiah@gmail.com', '12345', '', ''),
(2, 'ukiuki@gmail.com', '123456', 'ukiii', '083543265121'),
(3, 'blabla@gmail.com', '12345678', 'Zizah', '083543265121'),
(4, 'ukiukiii@gmail.com', '12345678', 'zizah', '0812345676554');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `sepatu`
--
ALTER TABLE `sepatu`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `sepatu`
--
ALTER TABLE `sepatu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
