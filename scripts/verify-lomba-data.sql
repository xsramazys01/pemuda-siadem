-- Verify the lomba data has been inserted correctly
SELECT 
    kategori,
    COUNT(*) as jumlah_lomba,
    STRING_AGG(nama_lomba, ', ') as daftar_lomba
FROM lomba 
GROUP BY kategori 
ORDER BY 
    CASE kategori
        WHEN 'anak-anak' THEN 1
        WHEN 'remaja-dewasa' THEN 2  
        WHEN 'ibu-ibu' THEN 3
        WHEN 'bapak-bapak' THEN 4
        WHEN 'regu' THEN 5
        ELSE 6
    END;

-- Show all lomba details
SELECT 
    nama_lomba,
    kategori,
    hadiah_juara1,
    waktu_lomba,
    kontak_cp
FROM lomba
ORDER BY 
    CASE kategori
        WHEN 'anak-anak' THEN 1
        WHEN 'remaja-dewasa' THEN 2
        WHEN 'ibu-ibu' THEN 3  
        WHEN 'bapak-bapak' THEN 4
        WHEN 'regu' THEN 5
        ELSE 6
    END,
    nama_lomba;
