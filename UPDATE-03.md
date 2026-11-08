# Draft 0.3 — Profile, roles, and liquid blue

- Tagline: Hi, Ary is here. Frasa Be better than yesterday dihapus.
- Landing page: pengantar → profil → empat kategori peran → contact.
- Portfolio dibuka lewat Director, Director of Photography, Producer, atau Videographer. Setiap kategori membuka featured project dan rak kartu horizontal. Panah, swipe, keyboard, serta klik kartu tersedia.
- `roles` pada setiap proyek adalah daftar kategori peran. Nilai yang didukung: `Director`, `Director of Photography`, `Producer`, `Videographer`. Satu proyek dapat memiliki beberapa peran. Field `category` tetap untuk jenis karya (Narrative, Commercial, dll.), bukan navigasi utama.
- Producer dan Videographer berisi dummy bertanda jelas karena belum ada kredit peran itu pada materi asli. Hapus/ganti dummy melalui editor saat karya asli tersedia. Field `dummy: true` mengontrol label; ubah menjadi false setelah konten asli terkonfirmasi.
- Logo tetap memakai file sumber utuh. Kotak putih dihapus dan CSS mengubah warnanya menjadi putih; bentuk, alpha, dan proporsinya dipertahankan. Ini mengikuti izin terbaru pengguna bahwa warna boleh berubah. Aturan warna ini menggantikan catatan versi 0.2.
- Semua tipografi memakai Arial. Background memakai beberapa gradient biru, tombol/menu memakai glass, dan objek geometris memakai metallic liquid gradients. Motion dinonaktifkan dengan prefers-reduced-motion.
- Tetap statis tanpa layanan berbayar. Cara publish di README tidak berubah. Ini preview lokal dan belum dipublikasikan.
