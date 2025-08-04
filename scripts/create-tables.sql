-- Create lomba table
CREATE TABLE IF NOT EXISTS lomba (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_lomba TEXT NOT NULL,
    kategori TEXT NOT NULL CHECK (kategori IN ('anak-anak', 'ibu-ibu', 'remaja-dewasa', 'bapak-bapak', 'regu')),
    deskripsi TEXT,
    link_wa TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donasi table
CREATE TABLE IF NOT EXISTS donasi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_donatur TEXT NOT NULL,
    jumlah_donasi NUMERIC NOT NULL CHECK (jumlah_donasi > 0),
    pesan TEXT,
    tanggal_donasi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lomba_kategori ON lomba(kategori);
CREATE INDEX IF NOT EXISTS idx_donasi_jumlah ON donasi(jumlah_donasi DESC);
CREATE INDEX IF NOT EXISTS idx_donasi_tanggal ON donasi(tanggal_donasi DESC);
