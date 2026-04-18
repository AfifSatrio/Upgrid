-- ============================================================
-- UPGRID DIGITAL - Initial Schema
-- ============================================================

-- Enable UUID extension (jika pakai uuid, tapi kita pakai serial int sesuai ERD)

-- ============================================================
-- PAKET
-- ============================================================
CREATE TABLE paket (
  id_paket       SERIAL PRIMARY KEY,
  nama_paket     VARCHAR(100) NOT NULL,
  slug           VARCHAR(100) NOT NULL UNIQUE,
  deskripsi      TEXT,
  harga          DECIMAL(15, 2) NOT NULL,
  estimasi_hari  INTEGER NOT NULL,
  tipe_paket     VARCHAR(50) NOT NULL,
  status_aktif   BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BENEFIT_PAKET
-- ============================================================
CREATE TABLE benefit_paket (
  id_benefit        SERIAL PRIMARY KEY,
  id_paket          INTEGER NOT NULL REFERENCES paket(id_paket) ON DELETE CASCADE,
  deskripsi_benefit TEXT NOT NULL
);

-- ============================================================
-- PORTOFOLIO
-- ============================================================
CREATE TABLE portofolio (
  id_portofolio  SERIAL PRIMARY KEY,
  judul          VARCHAR(150) NOT NULL,
  deskripsi      TEXT,
  gambar         TEXT,
  link_project   TEXT,
  tanggal_publish TIMESTAMPTZ,
  status_tampil  BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ADMIN
-- ============================================================
CREATE TABLE admin (
  id_admin    SERIAL PRIMARY KEY,
  nama        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    TEXT NOT NULL,       -- bcrypt hash
  role        VARCHAR(50) NOT NULL DEFAULT 'admin',
  status_aktif BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PELANGGAN
-- ============================================================
CREATE TABLE pelanggan (
  id_pelanggan SERIAL PRIMARY KEY,
  nama         VARCHAR(150) NOT NULL,
  email        VARCHAR(150) NOT NULL,
  no_telepon   VARCHAR(20) NOT NULL,
  nama_brand   VARCHAR(150),
  alamat       TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PEMESANAN
-- ============================================================
CREATE TABLE pemesanan (
  id_pemesanan      SERIAL PRIMARY KEY,
  id_pelanggan      INTEGER NOT NULL REFERENCES pelanggan(id_pelanggan),
  id_paket          INTEGER NOT NULL REFERENCES paket(id_paket),
  kode_pemesanan    VARCHAR(20) NOT NULL UNIQUE,
  tanggal_pesan     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  nama_proyek       VARCHAR(200) NOT NULL,
  total_harga       DECIMAL(15, 2) NOT NULL,
  status_pemesanan  VARCHAR(30) NOT NULL DEFAULT 'menunggu_pembayaran',
    -- menunggu_pembayaran | diproses | selesai | dibatalkan
  catatan_tambahan  TEXT,
  tanggal_mulai     TIMESTAMPTZ,
  tanggal_selesai   TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_status_pemesanan CHECK (
    status_pemesanan IN ('menunggu_pembayaran', 'diproses', 'selesai', 'dibatalkan')
  )
);

-- ============================================================
-- PEMBAYARAN
-- ============================================================
CREATE TABLE pembayaran (
  id_pembayaran          SERIAL PRIMARY KEY,
  id_pemesanan           INTEGER NOT NULL UNIQUE REFERENCES pemesanan(id_pemesanan),
  midtrans_order_id      VARCHAR(100),
  midtrans_transaction_id VARCHAR(100),
  snap_token             TEXT,
  redirect_url           TEXT,
  payment_type           VARCHAR(50),
  status_pembayaran      VARCHAR(20) NOT NULL DEFAULT 'pending',
    -- pending | paid | failed | expired | cancelled
  fraud_status           VARCHAR(20),
  gross_amount           DECIMAL(15, 2),
  transaction_time       TIMESTAMPTZ,
  settlement_time        TIMESTAMPTZ,
  expiry_time            TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_status_pembayaran CHECK (
    status_pembayaran IN ('pending', 'paid', 'failed', 'expired', 'cancelled')
  )
);

-- ============================================================
-- PROGRESS_PEMESANAN
-- ============================================================
CREATE TABLE progress_pemesanan (
  id_progress       SERIAL PRIMARY KEY,
  id_pemesanan      INTEGER NOT NULL REFERENCES pemesanan(id_pemesanan) ON DELETE CASCADE,
  id_admin          INTEGER NOT NULL REFERENCES admin(id_admin),
  judul_update      VARCHAR(200) NOT NULL,
  deskripsi_progress TEXT,
  persentase        INTEGER NOT NULL DEFAULT 0 CHECK (persentase BETWEEN 0 AND 100),
  status_progress   VARCHAR(20) NOT NULL,
    -- brief | desain | development | revisi | selesai
  tanggal_update    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_status_progress CHECK (
    status_progress IN ('brief', 'desain', 'development', 'revisi', 'selesai')
  )
);

-- ============================================================
-- TESTIMONI
-- ============================================================
CREATE TABLE testimoni (
  id_testimoni SERIAL PRIMARY KEY,
  id_admin     INTEGER NOT NULL REFERENCES admin(id_admin),
  nama_tampil  VARCHAR(150) NOT NULL,
  nama_brand   VARCHAR(150),
  rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  komentar     TEXT NOT NULL,
  status_tampil BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_pemesanan_kode ON pemesanan(kode_pemesanan);
CREATE INDEX idx_pemesanan_status ON pemesanan(status_pemesanan);
CREATE INDEX idx_pembayaran_midtrans_order ON pembayaran(midtrans_order_id);
CREATE INDEX idx_progress_pemesanan ON progress_pemesanan(id_pemesanan);
CREATE INDEX idx_benefit_paket ON benefit_paket(id_paket);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_paket_updated_at BEFORE UPDATE ON paket
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_portofolio_updated_at BEFORE UPDATE ON portofolio
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_admin_updated_at BEFORE UPDATE ON admin
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_pelanggan_updated_at BEFORE UPDATE ON pelanggan
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_pemesanan_updated_at BEFORE UPDATE ON pemesanan
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_pembayaran_updated_at BEFORE UPDATE ON pembayaran
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_testimoni_updated_at BEFORE UPDATE ON testimoni
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED: Default Admin
-- Password: admin123 (ganti sebelum production!)
-- bcrypt hash of "admin123" dengan cost 12
-- ============================================================
INSERT INTO admin (nama, email, password, role) VALUES
  ('Super Admin', 'admin@upgrid.id', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGQhAoL7.J0f6xQ8WW7kxvZcGKi', 'superadmin');
