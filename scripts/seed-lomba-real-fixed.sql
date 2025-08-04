-- Clear existing lomba data
DELETE FROM lomba;

-- Insert real lomba data based on the provided image with complete information

-- Kategori Anak-Anak (Individual)
INSERT INTO lomba (
    nama_lomba, kategori, deskripsi, link_wa, syarat, 
    hadiah_juara1, hadiah_juara2, hadiah_juara3, 
    tanggal_lomba, waktu_lomba, tempat_lomba, kontak_cp
) VALUES
('Lomba Kerupuk', 'anak-anak', 
 'Lomba makan kerupuk untuk anak-anak dengan cara menggigit kerupuk yang digantung tanpa menggunakan tangan', 
 'https://wa.me/083149745785',
 'Peserta berusia 5-12 tahun, didampingi orang tua, membawa identitas diri',
 'Rp 300.000 + Piala + Sertifikat', 'Rp 200.000 + Piala + Sertifikat', 'Rp 100.000 + Piala + Sertifikat',
 '2025-08-17', '08:00 - 10:00', 'Lapangan Utama Siadem', '083149745785'),

('Lomba Kelereng', 'anak-anak', 
 'Lomba permainan kelereng tradisional untuk anak-anak dengan berbagai tantangan menarik', 
 'https://wa.me/083149745785',
 'Peserta berusia 5-12 tahun, didampingi orang tua, membawa identitas diri',
 'Rp 300.000 + Piala + Sertifikat', 'Rp 200.000 + Piala + Sertifikat', 'Rp 100.000 + Piala + Sertifikat',
 '2025-08-17', '08:00 - 10:00', 'Lapangan Utama Siadem', '083149745785'),

('Lomba Pensil Dalam Botol', 'anak-anak', 
 'Lomba memasukkan pensil ke dalam botol dengan tingkat kesulitan yang menantang untuk anak-anak', 
 'https://wa.me/083149745785',
 'Peserta berusia 5-12 tahun, didampingi orang tua, membawa identitas diri',
 'Rp 300.000 + Piala + Sertifikat', 'Rp 200.000 + Piala + Sertifikat', 'Rp 100.000 + Piala + Sertifikat',
 '2025-08-17', '08:00 - 10:00', 'Lapangan Utama Siadem', '083149745785'),

('Lomba Benang Dalam Jarum', 'anak-anak', 
 'Lomba memasukkan benang ke dalam lubang jarum, melatih ketelitian dan kesabaran anak-anak', 
 'https://wa.me/083149745785',
 'Peserta berusia 5-12 tahun, didampingi orang tua, membawa identitas diri',
 'Rp 300.000 + Piala + Sertifikat', 'Rp 200.000 + Piala + Sertifikat', 'Rp 100.000 + Piala + Sertifikat',
 '2025-08-17', '08:00 - 10:00', 'Lapangan Utama Siadem', '083149745785'),

-- Kategori Remaja/Dewasa (Individual)
('Lomba Kayu Berjalan', 'remaja-dewasa', 
 'Lomba berjalan di atas balok kayu dengan menjaga keseimbangan, menguji ketangkasan dan konsentrasi', 
 'https://wa.me/083149745785',
 'Peserta berusia 13-40 tahun, membawa KTP/Kartu Pelajar, kondisi fisik sehat',
 'Rp 500.000 + Piala + Sertifikat', 'Rp 350.000 + Piala + Sertifikat', 'Rp 200.000 + Piala + Sertifikat',
 '2025-08-17', '10:30 - 12:30', 'Lapangan Utama Siadem', '083149745785'),

('Lomba Masukan Air Pakai Topeng', 'remaja-dewasa', 
 'Lomba memasukkan air ke dalam wadah sambil memakai topeng yang menghalangi pandangan', 
 'https://wa.me/083149745785',
 'Peserta berusia 13-40 tahun, membawa KTP/Kartu Pelajar, kondisi fisik sehat',
 'Rp 500.000 + Piala + Sertifikat', 'Rp 350.000 + Piala + Sertifikat', 'Rp 200.000 + Piala + Sertifikat',
 '2025-08-17', '10:30 - 12:30', 'Lapangan Utama Siadem', '083149745785'),

('Lomba Masukin Benang Dalam Jarum', 'remaja-dewasa', 
 'Lomba memasukkan benang ke dalam lubang jarum untuk kategori remaja dan dewasa dengan tingkat kesulitan lebih tinggi', 
 'https://wa.me/083149745785',
 'Peserta berusia 13-40 tahun, membawa KTP/Kartu Pelajar, kondisi fisik sehat',
 'Rp 500.000 + Piala + Sertifikat', 'Rp 350.000 + Piala + Sertifikat', 'Rp 200.000 + Piala + Sertifikat',
 '2025-08-17', '10:30 - 12:30', 'Lapangan Utama Siadem', '083149745785'),

-- Kategori Ibu-Ibu (Individual)
('Lomba Makan Kerupuk', 'ibu-ibu', 
 'Lomba makan kerupuk khusus untuk ibu-ibu dengan cara menggigit kerupuk yang digantung tanpa menggunakan tangan', 
 'https://wa.me/08886074780',
 'Peserta ibu-ibu berusia 25+ tahun, membawa KTP, kondisi fisik sehat',
 'Rp 400.000 + Piala + Sertifikat', 'Rp 300.000 + Piala + Sertifikat', 'Rp 150.000 + Piala + Sertifikat',
 '2025-08-17', '13:00 - 15:00', 'Lapangan Utama Siadem', '08886074780'),

('Lomba Terong', 'ibu-ibu', 
 'Lomba dengan menggunakan terong sebagai media permainan tradisional yang seru dan menghibur', 
 'https://wa.me/08886074780',
 'Peserta ibu-ibu berusia 25+ tahun, membawa KTP, kondisi fisik sehat',
 'Rp 400.000 + Piala + Sertifikat', 'Rp 300.000 + Piala + Sertifikat', 'Rp 150.000 + Piala + Sertifikat',
 '2025-08-17', '13:00 - 15:00', 'Lapangan Utama Siadem', '08886074780'),

('Lomba Pukul Kendil', 'ibu-ibu', 
 'Lomba memukul kendil dengan mata tertutup, mengandalkan insting dan keberuntungan', 
 'https://wa.me/08886074780',
 'Peserta ibu-ibu berusia 25+ tahun, membawa KTP, kondisi fisik sehat',
 'Rp 400.000 + Piala + Sertifikat', 'Rp 300.000 + Piala + Sertifikat', 'Rp 150.000 + Piala + Sertifikat',
 '2025-08-17', '13:00 - 15:00', 'Lapangan Utama Siadem', '08886074780'),

-- Kategori Bapak-Bapak
('Lomba Catur', 'bapak-bapak', 
 'Turnamen catur untuk bapak-bapak, menguji strategi dan kecerdasan dalam permainan klasik', 
 'https://wa.me/08886074780',
 'Peserta bapak-bapak berusia 25+ tahun, membawa KTP, kondisi fisik sehat',
 'Rp 600.000 + Piala + Sertifikat', 'Rp 400.000 + Piala + Sertifikat', 'Rp 250.000 + Piala + Sertifikat',
 '2025-08-17', '14:00 - 16:00', 'Lapangan Utama Siadem', '08886074780'),

('Lomba Gapleh', 'bapak-bapak', 
 'Lomba permainan gapleh tradisional yang populer di kalangan bapak-bapak, menguji keahlian dan strategi', 
 'https://wa.me/08886074780',
 'Peserta bapak-bapak berusia 25+ tahun, membawa KTP, kondisi fisik sehat',
 'Rp 600.000 + Piala + Sertifikat', 'Rp 400.000 + Piala + Sertifikat', 'Rp 250.000 + Piala + Sertifikat',
 '2025-08-17', '16:00 - 17:00', 'Lapangan Utama Siadem', '08886074780'),

-- Kategori Lomba Regu (Team Competition)
('Lomba Estafet Sedotan', 'regu', 
 'Lomba estafet menggunakan sedotan sebagai media permainan, membutuhkan kerjasama tim yang solid', 
 'https://wa.me/083149745785',
 'Tim terdiri dari 4-6 orang, minimal 1 perempuan, semua anggota membawa identitas',
 'Rp 1.000.000 + Piala + Sertifikat', 'Rp 750.000 + Piala + Sertifikat', 'Rp 500.000 + Piala + Sertifikat',
 '2025-08-17', '09:00 - 11:00', 'Lapangan Utama Siadem', '083149745785'),

('Lomba Estafet Sarung', 'regu', 
 'Lomba estafet dengan menggunakan sarung, menguji kekompakan dan kecepatan tim', 
 'https://wa.me/083149745785',
 'Tim terdiri dari 4-6 orang, minimal 1 perempuan, semua anggota membawa identitas',
 'Rp 1.000.000 + Piala + Sertifikat', 'Rp 750.000 + Piala + Sertifikat', 'Rp 500.000 + Piala + Sertifikat',
 '2025-08-17', '09:00 - 11:00', 'Lapangan Utama Siadem', '083149745785'),

('Lomba Joget Balon', 'regu', 
 'Lomba menari sambil menjaga balon agar tidak jatuh, membutuhkan koordinasi dan kerjasama tim', 
 'https://wa.me/08886074780',
 'Tim terdiri dari 4-6 orang, minimal 1 perempuan, semua anggota membawa identitas',
 'Rp 1.000.000 + Piala + Sertifikat', 'Rp 750.000 + Piala + Sertifikat', 'Rp 500.000 + Piala + Sertifikat',
 '2025-08-17', '09:00 - 11:00', 'Lapangan Utama Siadem', '08886074780'),

('Lomba Estafet Karet', 'regu', 
 'Lomba estafet menggunakan karet gelang sebagai media permainan, menguji ketangkasan dan kerjasama tim', 
 'https://wa.me/08886074780',
 'Tim terdiri dari 4-6 orang, minimal 1 perempuan, semua anggota membawa identitas',
 'Rp 1.000.000 + Piala + Sertifikat', 'Rp 750.000 + Piala + Sertifikat', 'Rp 500.000 + Piala + Sertifikat',
 '2025-08-17', '09:00 - 11:00', 'Lapangan Utama Siadem', '08886074780');
