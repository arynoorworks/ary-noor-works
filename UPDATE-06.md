# Draft 0.6 — Timed liquid introduction

Menggunakan file logo chrome terbaru yang diberikan pengguna sebagai `assets/logo-anw-chrome.png`. File disalin utuh. Setelah intro, tidak ada filter warna, distortion, ataupun perubahan bentuk pada gambar logo.

Urutan saat membuka/reload home:
1. Detik 0–2: hanya WELCOME TO di tengah. Logo, menu, dan tombol masuk tersembunyi.
2. Detik 2–4: teks larut melalui SVG displacement, blur, dan pelebaran, sampai hilang.
3. Detik 4–5.6: logo terlihat melalui displacement liquid yang mereda ke nol; tidak ada opacity fade pada logo. Bentuk boleh terdistorsi selama transisi lalu kembali ke gambar asli.
4. Setelah 5.6 detik: menu dan tombol scroll aktif. Scroll memindahkan logo ke kiri atas: lebar wadah 104px desktop / 88px mobile, lebih kecil dari versi 0.5. Backdrop blur 15px di belakang watermark memburamkan konten yang lewat.

Intro diputar sekali per pemuatan dokumen. Navigasi internal kembali ke home tidak mengulang penantian; reload home untuk mengulang seluruh urutan. Scroll dikunci selama intro agar urutannya tidak terlewati. Prefers-reduced-motion mempertahankan jeda namun menonaktifkan distorsi dan deformasi logo.

Siluet watermark tidak memakai kotak/border. Lapisan blur di belakangnya transparan dengan sudut lembut, mirip efek backdrop menu. Foto kategori, profil, editor, serta instruksi publikasi gratis tetap tersedia.
