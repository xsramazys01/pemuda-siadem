-- Update lomba with more detailed information including prizes, schedule, and requirements

-- Update Kategori Anak-Anak
UPDATE lomba SET 
    syarat = 'Peserta berusia 5-12 tahun, didampingi orang tua, membawa identitas diri',
    hadiah_juara1 = 'Rp 300.000 + Piala + Sertifikat',
    hadiah_juara2 = 'Rp 200.000 + Piala + Sertifikat', 
    hadiah_juara3 = 'Rp 100.000 + Piala + Sertifikat',
    tanggal_lomba = '2025-08-17',
    waktu_lomba = '08:00 - 10:00',
    tempat_lomba = 'Lapangan Utama Siadem',
    kontak_cp = '083149745785'
WHERE kategori = 'anak-anak';

-- Update Kategori Remaja/Dewasa  
UPDATE lomba SET
    syarat = 'Peserta berusia 13-40 tahun, membawa KTP/Kartu Pelajar, kondisi fisik sehat',
    hadiah_juara1 = 'Rp 500.000 + Piala + Sertifikat',
    hadiah_juara2 = 'Rp 350.000 + Piala + Sertifikat',
    hadiah_juara3 = 'Rp 200.000 + Piala + Sertifikat', 
    tanggal_lomba = '2025-08-17',
    waktu_lomba = '10:30 - 12:30',
    tempat_lomba = 'Lapangan Utama Siadem',
    kontak_cp = '083149745785'
WHERE kategori = 'remaja-dewasa';

-- Update Kategori Ibu-Ibu
UPDATE lomba SET
    syarat = 'Peserta ibu-ibu berusia 25+ tahun, membawa KTP, kondisi fisik sehat',
    hadiah_juara1 = 'Rp 400.000 + Piala + Sertifikat',
    hadiah_juara2 = 'Rp 300.000 + Piala + Sertifikat',
    hadiah_juara3 = 'Rp 150.000 + Piala + Sertifikat',
    tanggal_lomba = '2025-08-17', 
    waktu_lomba = '13:00 - 15:00',
    tempat_lomba = 'Lapangan Utama Siadem',
    kontak_cp = '08886074780'
WHERE kategori = 'ibu-ibu';

-- Update Kategori Bapak-Bapak
UPDATE lomba SET
    syarat = 'Peserta bapak-bapak berusia 25+ tahun, membawa KTP, kondisi fisik sehat',
    hadiah_juara1 = 'Rp 600.000 + Piala + Sertifikat',
    hadiah_juara2 = 'Rp 400.000 + Piala + Sertifikat', 
    hadiah_juara3 = 'Rp 250.000 + Piala + Sertifikat',
    tanggal_lomba = '2025-08-17',
    waktu_lomba = '15:30 - 17:30',
    tempat_lomba = 'Lapangan Utama Siadem',
    kontak_cp = '08886074780'
WHERE kategori = 'bapak-bapak';

-- Update Kategori Regu (Team)
UPDATE lomba SET
    syarat = 'Tim terdiri dari 4-6 orang, minimal 1 perempuan, semua anggota membawa identitas',
    hadiah_juara1 = 'Rp 1.000.000 + Piala + Sertifikat',
    hadiah_juara2 = 'Rp 750.000 + Piala + Sertifikat',
    hadiah_juara3 = 'Rp 500.000 + Piala + Sertifikat',
    tanggal_lomba = '2025-08-17',
    waktu_lomba = '09:00 - 11:00', 
    tempat_lomba = 'Lapangan Utama Siadem',
    kontak_cp = '083149745785'
WHERE kategori = 'regu';

-- Special update for specific competitions with unique schedules
UPDATE lomba SET waktu_lomba = '14:00 - 16:00' WHERE nama_lomba = 'Lomba Catur';
UPDATE lomba SET waktu_lomba = '16:00 - 17:00' WHERE nama_lomba = 'Lomba Gapleh';
