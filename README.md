# KAIZAS FIX BUG Pro v2 — Vercel

Website servis profesional dalam Bahasa Melayu: servis, harga, borang tempahan, FAQ, placeholder testimoni, dua pautan saluran WhatsApp, SEO, reka bentuk responsif, API tempahan dan dashboard admin.

## Struktur projek

- `index.html` — laman utama, metadata SEO dan kandungan
- `admin.html` — dashboard admin
- `src/style.css` — gaya responsif dan aksesibiliti
- `src/script.js` — borang tempahan, pautan WhatsApp dan motion visual pilihan
- `src/admin.js` — dashboard yang membaca dan mengemas kini tempahan
- `api/bookings.js` — API Vercel untuk simpan/baca/kemas kini tempahan
- `public/assets/cyber-motion.mp4` — aset video visual cyber pilihan (besar; hanya dimuat apabila butang motion ditekan)
- `public/assets/social-card.svg` — kad perkongsian sosial
- `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest` — SEO / PWA metadata
- `supabase-schema.sql` — skema jadual tempahan
- `vercel.json` — security headers

## Deploy ke Vercel

1. Muat turun ZIP dan ekstrak.
2. Muat naik semua fail/folder ke root repository GitHub.
3. Import repository itu di Vercel.
4. Framework Preset: **Vite**; Build Command: `npm run build`; Output Directory: `dist`; Install Command: `npm install`.
5. Tambahkan konfigurasi Supabase seperti di bawah sebelum menggunakan dashboard tempahan.

## Aktifkan penyimpanan tempahan dan dashboard

1. Cipta projek di Supabase.
2. Buka SQL Editor dan jalankan kandungan `supabase-schema.sql`.
3. Di Vercel → Project → Settings → Environment Variables, tambah:
   - `SUPABASE_URL` = URL projek Supabase
   - `SUPABASE_SERVICE_ROLE_KEY` = service role key Supabase (rahsia; **jangan letak dalam kod frontend/GitHub**)
   - `ADMIN_TOKEN` = token rawak panjang, sekurang-kurangnya 32 aksara
4. Redeploy projek.
5. Buka `/admin.html`, masukkan `ADMIN_TOKEN` dan urus status tempahan.

Jika Supabase belum dikonfigurasi, borang masih boleh membuka WhatsApp tetapi rekod tidak akan disimpan ke dashboard. API mengehadkan panjang input, menyemak medan, menolak honeypot dan memerlukan token admin untuk GET/PATCH. Untuk laman bertrafik tinggi, tambah rate limiting/WAF sebelum mengiklankan API kepada umum.

## Sebelum website diterbitkan

- Tukar URL canonical `https://kaizas-fix-bug.vercel.app/` kepada domain sebenar anda dalam `index.html`, `public/robots.txt` dan `public/sitemap.xml`.
- Dalam `src/script.js`, isi `CHANNEL_URLS` dengan URL sebenar kedua-dua saluran WhatsApp.
- Tukar kad testimoni placeholder kepada ulasan sebenar dengan kebenaran pelanggan. Jangan terbitkan testimoni rekaan.
- Harga RM5 ialah harga permulaan; sahkan harga dan skop dengan pelanggan sebelum kerja.
- Jangan kongsi token admin atau Supabase service role key.

## Saiz aset

Video cyber motion disediakan sebagai aset pilihan dan hanya mula dimuat apabila pelawat menekan butang motion. Ia menjadikan ZIP dan output `dist` lebih 60 MB seperti diminta, tetapi boleh menambah masa deploy dan penggunaan storan/bandwidth. Untuk kelajuan terbaik, keluarkan `public/assets/cyber-motion.mp4` jika tidak diperlukan.

## Jalankan secara tempatan

```bash
npm install
npm run dev
```
