# Tahap 1 (Kualifikasi) — Kategori Junior-II (SD Kelas 6 – SMP)

## Tujuan
Membuat game/aplikasi dengan sistem yang lebih terstruktur: ada “mission loop”, kondisi menang/kalah yang ketat, dan minimal 1 fitur yang menunjukkan perencanaan logika (mis. level, checkpoint, atau power-up dengan durasi).

## Pilihan Platform (pilih salah satu)
- Scratch (MIT)
- Code.org (Game Lab)
- Roblox Studio

## Tema Karya
**“Rescue Ops: Misi & Strategi”**

Pemain menyelesaikan misi penyelamatan dengan mengumpulkan item, menghindari ancaman, dan mencapai target dalam batas waktu/nyawa.

## Ketentuan Minimum (wajib)
1. **Brief Misi**
   - Di awal permainan tampil misi (mis. “Kumpulkan 10 data-chip dan kembali ke base”).
2. **Sistem Progres Terstruktur**
   - Minimal salah satu:
     - Level/stage (Stage 1 -> Stage 2), atau
     - Checkpoint (mis. setelah item tertentu terkumpul), atau
     - Objective bertahap (Objective A lalu B).
3. **Sistem Skor & Penalti**
   - Skor bertambah dari aksi benar.
   - Ada penalti yang jelas (nyawa berkurang, skor berkurang, atau waktu berkurang).
4. **Ancaman Dinamis**
   - Minimal 1 musuh/rintangan yang bergerak atau muncul berkala (spawn).
5. **Power-up / Item Khusus**
   - Minimal 1 item dengan efek sementara (contoh: shield 5 detik, slow enemy, double score).
6. **Kondisi Menang/Kalah**
   - Menang: misi selesai (objective terpenuhi).
   - Kalah: waktu habis / nyawa habis / kondisi gagal lain yang tegas.
7. **Kebutuhan Teknis**
   - Minimal 2 latar/background.
   - Minimal 6 objek/sprite (pemain, ancaman, item biasa, item khusus, UI, dekorasi/efek).
   - Minimal 4 variabel/state (contoh: `Skor`, `Nyawa`, `Waktu`, `Objective`, `Stage`, `PowerUpTimer`).

## Nilai Tambah (opsional)
- Sistem kombo (bonus jika ambil item beruntun tanpa kena penalti).
- Laporan hasil (summary) di akhir: skor akhir, item terkumpul, waktu sisa.
- Desain level yang makin sulit (pola spawn lebih rumit).

## Larangan
- Menyalin karya orang lain secara utuh.
- Konten SARA, kekerasan ekstrem, atau bahasa tidak pantas.

## Waktu Pengerjaan (disarankan)
150 menit.

## Yang Dikumpulkan
- Scratch: file `.sb3` + link share (jika dipakai).
- Code.org: link share project.
- Roblox Studio: file proyek (`.rbxl` / `.rbxlx`) + video demo 75–120 detik + catatan kontrol.

## Format Nama Berkas (jika ada file)
`KUALIFIKASI_JUNIOR-II_NamaPeserta_NamaSekolah`

## Rubrik Penilaian (Total 100)
| Aspek | Deskripsi | Skor |
|---|---|---:|
| Fungsional & Kelengkapan | Semua ketentuan minimum terpenuhi, minim bug saat diuji. | 0–20 |
| Sistem & Kompleksitas | Progres terstruktur (level/checkpoint/objective), power-up berfungsi benar, ancaman dinamis. | 0–30 |
| Logika & Kualitas Implementasi | State/variabel rapi, mekanik konsisten, edge case tertangani (restart, menang/kalah). | 0–20 |
| Kreativitas & Desain Game | Ide misi menarik, variasi mekanik, balancing yang masuk akal. | 0–15 |
| UX & Presentasi | Instruksi jelas, UI informatif, feedback aksi bagus, video demo (jika diminta) jelas. | 0–15 |

