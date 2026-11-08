# Draft 0.7

## Visual dan animasi

- Intro menggunakan blur in/out sederhana. Tidak ada deformasi atau liquid displacement pada teks/logo.
- Logo lebar 3840 × 1280 piksel, metadata 300 dpi. Ekspor ini merupakan upscale dan sharpening konservatif dari PNG sumber, bukan sumber vektor baru; detail yang tidak ada pada sumber tidak dapat dipulihkan sepenuhnya. Bentuk tidak digambar ulang.
- Highlight berputar dibatasi ke outline hasil alpha logo dan aktif selama logo besar. Logo docked tidak memakai animasi outline.
- Blur watermark memakai radial gradient mask yang memudar ke transparan, tanpa panel, sudut, atau border berbentuk round rectangle.
- Dua bentuk glass menyerupai tubing dan glow bergerak lambat di background welcome, dengan opacity rendah.
- Profil memakai foto lebar full-page dan gradient yang menyatu dengan teks. Caption Behind the frame dihapus. Setiap unsur profil memiliki reveal blur dan gerak halus.
- Judul penutup memakai reveal blur lambat dan zoom dari 92% ke 100%. Tombol percakapan memakai ikon chat bulky glass. Panah kategori dipertebal lagi.
- Prefers-reduced-motion menonaktifkan motion berulang dan reveal.

## Aset gambar

Pengeditan foto menggunakan alat gambar bawaan, bukan CLI. Hasil disimpan di assets:
- category-producer-refined.webp: retouch kulit natural, hilangkan facial hair, ganti cup dengan storyboard paperwork; jaga identitas, baju, dan scene.
- category-videographer-refined.webp: fokus tajam ke subjek depan dan rig, blur optik pada orang belakang serta background; pertahankan identitas dan pose.
- ary-noor-hero-wide.webp: perluas portrait ke landscape, subjek di kanan dan negative space biru gelap di kiri; pertahankan identitas, ekspresi, pose arms crossed, dan pakaian.

Prompt set: “Retouch acne subtly, remove facial beard/chin stubble and mustache, replace coffee with storyboard paperwork, preserve identity and scene”; “Preserve front man, headset, shirt and camera rig, sharpen foreground and add shallow depth-of-field bokeh to background”; “Outpaint portrait into cinematic 16:9 hero, person in right third, clean navy negative space on left, preserve face and crossed-arm pose.”

Ketiga foto ini adalah versi edit untuk eksplorasi portfolio, bukan dokumentasi produksi yang sepenuhnya tidak diedit. Sumber aslinya tetap disimpan. Path foto kategori tersedia di categoryPhotos pada content.js; background profil juga dapat diubah melalui editor.
