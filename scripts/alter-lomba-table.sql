-- Add missing columns to lomba table
ALTER TABLE lomba ADD COLUMN IF NOT EXISTS syarat TEXT;
ALTER TABLE lomba ADD COLUMN IF NOT EXISTS hadiah_juara1 TEXT;
ALTER TABLE lomba ADD COLUMN IF NOT EXISTS hadiah_juara2 TEXT;
ALTER TABLE lomba ADD COLUMN IF NOT EXISTS hadiah_juara3 TEXT;
ALTER TABLE lomba ADD COLUMN IF NOT EXISTS tanggal_lomba DATE;
ALTER TABLE lomba ADD COLUMN IF NOT EXISTS waktu_lomba TEXT;
ALTER TABLE lomba ADD COLUMN IF NOT EXISTS tempat_lomba TEXT;
ALTER TABLE lomba ADD COLUMN IF NOT EXISTS kontak_cp TEXT;

-- Update the check constraint for kategori to include all categories
ALTER TABLE lomba DROP CONSTRAINT IF EXISTS lomba_kategori_check;
ALTER TABLE lomba ADD CONSTRAINT lomba_kategori_check 
CHECK (kategori IN ('anak-anak', 'ibu-ibu', 'remaja-dewasa', 'bapak-bapak', 'regu'));
