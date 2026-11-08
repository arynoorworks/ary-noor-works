# Draft 0.11

- Form kontak kembali ke tempo draft 0.9: buka 500 ms, tutup 400 ms; reveal konten 250 ms, tanpa blur panel yang lambat.
- Stroke highlight logo kini berupa path SVG hasil tracing alpha logo yang sama. Garis bergerak menyusuri kontur utama dan lubang A, siklus 6 detik, dilapisi halo lembut. Bentuk logo asli tetap dipakai.
- Profil menampilkan assets/ary-noor-portrait.png secara langsung, mengembalikan wajah dari foto asli. Background landscape dipakai hanya pada sisi kiri dan dibuat memudar sebelum area subjek; foto asli menyatu melalui mask gradient.
- Background dan sambungan opening tetap dipertahankan. Menu ikon dari draft 0.10 tetap ada.
- Aset halaman diberi versi agar browser tidak memakai JavaScript/CSS lama.
- Verifikasi: pemeriksaan sintaks; preview stroke aktif; sumber foto profil asli; form terbuka/tertutup dan scroll kembali aktif setelah penutupan.

Preview: http://localhost:4173/?v=11#/
