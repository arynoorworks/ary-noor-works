# Draft 0.5

Home kini dibuka dengan WELCOME TO dan logo ANW besar di tengah. Gradient glass pada siluet logo bergerak lembut. Scroll mengecilkan sekaligus memindahkan satu logo yang sama ke kiri atas; scroll balik mengembalikannya ke tengah. Tombol Scroll to discover dapat dipakai dengan keyboard untuk masuk ke profil. Halaman selain home langsung memakai logo kecil.

Animasi mengikuti scroll tanpa library tambahan. Prefers-reduced-motion menghentikan shimmer dan mengganti interpolasi dengan perpindahan sederhana. Logo tetap menggunakan mask dari aset asli, tanpa menggambar ulang bentuk.

Menu diperkecil. Tombol geser kiri/kanan katalog dan seluruh tag nomor kategori dihapus dari markup. Rak proyek tetap mendukung swipe, trackpad, scrollbar, serta keyboard ketika rak mendapat fokus. Panah pada tombol menggunakan SVG tebal dengan gradient dan highlight glass. Panah pada kalimat Choose a role dihapus.

Sudah diperiksa pada viewport desktop dan mobile 390px, termasuk logo sebelum/sesudah scroll, klik masuk ke profil, serta tidak adanya tombol katalog dan tag nomor.
