# ARY NOOR — Draft 0.13

UPDATE-09.md mencatat form kontak mengembang, validasi, handoff WhatsApp, glow outline, dan file yang diubah. Tombol Start a conversation kini membuka form. WhatsApp memakai nomor phone yang sudah dikonfigurasi di content.js; tambahkan whatsapp bila nomor tujuannya ingin berbeda.

Lihat UPDATE-08.md untuk transisi terbaru, logo restorasi 2K, background referensi, header blur dan hover glass. UPDATE-07.md menjelaskan sumber foto edit sebelumnya. Catatan versi terbaru menggantikan rincian visual versi sebelumnya.

Website statis personal filmmaker portfolio. HTML, CSS, dan JavaScript biasa; tidak perlu npm, build, database, plugin berbayar, atau CMS server. Enam karya, still, profil, kontak, dan logo asli kini diambil dari materi portfolio 2024. Baca MATERIAL-NOTES.md untuk sumber, batas informasi, dan perlakuan logo.

Lihat UPDATE-03.md untuk struktur terbaru: profil di home, kategori peran, katalog horizontal, dummy, dan perubahan warna logo. Catatan versi terbaru menggantikan uraian visual lama.

## Preview

Buka `index.html` di browser. Routing menggunakan hash (`#/works`, `#/work/project-01`, `#/about`, `#/contact`) sehingga halaman detail tetap dapat dibagikan dan di-refresh di hosting statis. Untuk preview lokal dengan server, jalankan `python3 -m http.server 4173` dari folder ini jika Python tersedia, kemudian buka http://localhost:4173.

## Mengedit tanpa menyentuh layout

1. Buka `editor.html` atau tautan **Edit draft** di footer.
2. Ganti profil, email, sosial, judul, kategori, tahun, role, sinopsis, catatan kreatif, dan kredit. Tambah/hapus proyek atau atur urutannya.
3. Klik **Simpan draft lokal**, lalu **Preview draft**. Data ini hanya berada di browser/perangkat yang sama, bukan website publik. Preview lokal menampilkan badge khusus.
4. Klik **Unduh content.js**. Ganti file `content.js` lama dengan hasil unduhan, di folder website atau GitHub.
5. Unduh cadangan JSON jika ingin melanjutkan editing di perangkat lain. Impor lewat editor. Editor bukan CMS yang terhubung ke GitHub dan tidak punya tombol publish otomatis.

Alternatif: edit langsung objek `window.PORTFOLIO` di `content.js`. Satu objek dalam `projects` adalah satu proyek. `id` harus unik dan sebaiknya tidak berubah setelah link dibagikan. Urutan array menentukan urutan kartu. `credits` dan `stills` adalah daftar; kosongkan menjadi `[]` jika belum ada. Hindari mengganti nama field.

## Memasang gambar dan video

- Letakkan media sendiri yang sudah disetujui di `assets/`. Contoh cover: `assets/film-01.jpg`. Gunakan JPG/WebP terkompresi dengan lebar sekitar 1600–2000 piksel.
- `cover` untuk gambar kartu dan hero detail; `stills` untuk galeri; `video` untuk URL/path MP4 langsung. Tidak ada autoplay bersuara. Player baru memuat saat digunakan.
- Tautan halaman YouTube/Vimeo tidak dapat dipasang pada field MP4. Isi field Tautan tontonan pada editor untuk link YouTube, Drive, atau halaman video lainnya. Link dibuka pada platform asal; tidak dipaksa menjadi MP4.
- Batas aset Cloudflare Pages saat diperiksa: 25 MiB per file. Jangan taruh film panjang berukuran besar ke repo; kompres teaser di bawah batas atau gunakan host video gratis dengan tautan/fitur embed yang sesuai.
- Jika media belum tersedia, kosongkan field. Placeholder abstrak dibuat dengan CSS lokal dan ditandai jelas, bukan frame film asli. Enam still sekarang merupakan gambar asli dari portfolio. Tidak ada aset stok atau font eksternal.

## Publish gratis: GitHub → Cloudflare Pages

1. Buat repository GitHub baru, misalnya `ary-noor-portfolio`, menggunakan akun gratis. Upload seluruh isi folder ini, dengan `index.html` di root repository. Folder `assets` dapat diisi kemudian. Jangan upload video referensi milik pihak lain.
2. Login ke Cloudflare dan pilih **Workers & Pages → Create application → Pages → Connect to Git**. Tampilan dashboard dapat berubah; pastikan yang dibuat adalah Pages dengan integrasi Git.
3. Hubungkan akun GitHub, izinkan akses hanya ke repository portfolio yang dipilih, lalu pilih repository itu.
4. Production branch: `main`. Framework preset: **None**. Build command: `exit 0`. Build output directory: `.`. Root directory: kosong/root repository. Tidak perlu environment variables.
5. Deploy. Cloudflare memberikan subdomain `nama-project.pages.dev`, sesuai ketersediaan nama. Domain berbayar tidak diperlukan.
6. Untuk revisi, ganti `content.js`/media di GitHub dan commit. Integrasi Pages melakukan deploy ulang. Jika salah, pulihkan commit atau gunakan rollback deployment.

Sumber resmi yang diperiksa 8 November 2026:
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- https://developers.cloudflare.com/pages/platform/limits/

Free plan memiliki kuota (termasuk 500 build per bulan dan batas file); paket gratis bukan tanpa batas. Tidak ada layanan berbayar yang menjadi dependensi website ini. Draft belum dipublikasikan ke akun GitHub/Cloudflare karena akun/repository tujuan belum dihubungkan.

## Cakupan dan materi berikutnya

Home dengan sticky stacked cards; selected works dengan filter; detail setiap karya; about; contact; navigasi mengambang; layout mobile; reduced-motion; editor lokal dan ekspor. Contact aktif hanya setelah email/URL nyata diisi. Tidak ada form yang berpura-pura mengirim pesan.

Panduan visual mengikuti uraian referensi dalam chat terdahulu. File video referensi ditemukan, tetapi pemutaran langsung tidak berhasil di lingkungan ini; kesesuaian animasi frame demi frame belum diverifikasi. Montage terpisah tidak ditemukan. Video referensi tidak didistribusikan bersama website.

Materi lanjutan: sinopsis lengkap, tambahan still, kredit tim lengkap, konfirmasi kontak dan status pendidikan terkini, serta pembaruan tautan/rilis. Tidak perlu merancang ulang layout untuk menggantinya.
