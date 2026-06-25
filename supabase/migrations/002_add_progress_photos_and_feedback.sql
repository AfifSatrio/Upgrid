-- ============================================================
-- 1. Add fields to progress_pemesanan
-- ============================================================

ALTER TABLE progress_pemesanan
ADD COLUMN lampiran_urls TEXT[],
ADD COLUMN feedback_user TEXT,
ADD COLUMN tanggal_feedback TIMESTAMPTZ,
ADD COLUMN balasan_admin TEXT,
ADD COLUMN tanggal_balasan TIMESTAMPTZ;

-- ============================================================
-- 2. Create Storage Bucket for Progress Photos
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('progress_updates', 'progress_updates', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'progress_updates' );

CREATE POLICY "Allow Upload to progress_updates"
ON storage.objects FOR INSERT
TO anon
WITH CHECK ( bucket_id = 'progress_updates' );

CREATE POLICY "Allow Update in progress_updates"
ON storage.objects FOR UPDATE
TO anon
USING ( bucket_id = 'progress_updates' );
