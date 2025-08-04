-- Insert sample lomba data
INSERT INTO lomba (nama_lomba, kategori, deskripsi, link_wa) VALUES
-- Anak-anak
('Lomba Kerupuk', 'anak-anak', 'Lomba makan kerupuk untuk anak-anak', 'https://wa.me/083149745785'),
('Lomba Kelereng', 'anak-anak', 'Lomba kelereng tradisional', 'https://wa.me/083149745785'),
('Lomba Pensil Dalam Botol', 'anak-anak', 'Lomba memasukkan pensil ke dalam botol', 'https://wa.me/083149745785'),
('Lomba Benang Dalam Jarum', 'anak-anak', 'Lomba memasukkan benang ke dalam jarum', 'https://wa.me/083149745785'),

-- Ibu-ibu
('Lomba Makan Kerupuk', 'ibu-ibu', 'Lomba makan kerupuk untuk ibu-ibu', 'https://wa.me/08886074780'),
('Lomba Terong', 'ibu-ibu', 'Lomba dengan terong', 'https://wa.me/08886074780'),
('Lomba Pukul Kendil', 'ibu-ibu', 'Lomba memukul kendil dengan mata tertutup', 'https://wa.me/08886074780'),

-- Remaja/Dewasa
('Lomba Kayu Berjalan', 'remaja-dewasa', 'Lomba berjalan di atas kayu', 'https://wa.me/083149745785'),
('Lomba Masukan Air Pakai Topeng', 'remaja-dewasa', 'Lomba memasukkan air dengan menggunakan topeng', 'https://wa.me/083149745785'),
('Lomba Masukin Benang Dalam Jarum', 'remaja-dewasa', 'Lomba memasukkan benang ke dalam jarum', 'https://wa.me/083149745785'),

-- Bapak-bapak
('Lomba Catur', 'bapak-bapak', 'Turnamen catur untuk bapak-bapak', 'https://wa.me/08886074780'),
('Lomba Gapleh', 'bapak-bapak', 'Lomba permainan gapleh tradisional', 'https://wa.me/08886074780'),

-- Lomba Regu
('Lomba Estafet Sedotan', 'regu', 'Lomba estafet menggunakan sedotan', 'https://wa.me/083149745785'),
('Lomba Estafet Sarung', 'regu', 'Lomba estafet dengan sarung', 'https://wa.me/083149745785'),
('Lomba Joget Balon', 'regu', 'Lomba joget dengan balon', 'https://wa.me/08886074780'),
('Lomba Estafet Karet', 'regu', 'Lomba estafet menggunakan karet', 'https://wa.me/08886074780');

-- Insert sample donasi data
INSERT INTO donasi (nama_donatur, jumlah_donasi, pesan, verified) VALUES
('Budi Santoso', 500000, 'Semoga acara sukses dan meriah!', true),
('Siti Aminah', 300000, 'Merdeka! Semangat 17 Agustus', true),
('Ahmad Rahman', 250000, 'Untuk kemeriahan acara kemerdekaan', true),
('Anonim', 150000, 'Semoga bermanfaat', false),
('Dewi Sartika', 400000, 'Sukses selalu untuk panitia', true),
('Anonim', 100000, '', false),
('Rudi Hartono', 350000, 'Dirgahayu Indonesia!', true),
('Maya Sari', 200000, 'Semoga acara lancar', true);
