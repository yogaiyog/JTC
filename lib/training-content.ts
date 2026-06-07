export type Question = {
  id: string;
  title: string;
  prompt: string;
  checklist: string[];
};

export type QuestionLevel = {
  id: "junior-i" | "junior-ii" | "junior-iii";
  label: string;
  age: string;
  intro: string;
  questions: Question[];
};

export const trainingVideos = {
  submitKarya:
    process.env.NEXT_PUBLIC_SUBMIT_KARYA_VIDEO ??
    "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE",
  ngerjainSoal:
    process.env.NEXT_PUBLIC_NGERJAIN_SOAL_VIDEO ??
    "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?start=32"
} as const;

export const questionLevels: QuestionLevel[] = [
  {
    id: "junior-i",
    label: "Junior-I",
    age: "TK - SD Kelas 2",
    intro: "Soal ringan untuk melatih alur dasar, interaksi, dan keberanian eksplorasi.",
    questions: [
      {
        id: "ji-1",
        title: "Tangkap Bintang",
        prompt: "Buat game sederhana untuk menangkap bintang.",
        checklist: [
          "Karakter bisa bergerak ke kiri dan kanan.",
          "Jika bintang tertangkap, skor bertambah.",
          "Tampilkan pesan selesai saat skor mencapai target."
        ]
      },
      {
        id: "ji-2",
        title: "Tebak Warna",
        prompt: "Buat aplikasi interaktif untuk memilih warna yang benar.",
        checklist: [
          "Tampilkan 3 pilihan warna.",
          "Jika pemain menekan warna yang benar, muncul pesan 'Benar'.",
          "Jika salah, muncul pesan 'Coba lagi'."
        ]
      },
      {
        id: "ji-3",
        title: "Lomba Balon",
        prompt: "Buat game balon naik ke atas dan pemain harus menekannya.",
        checklist: [
          "Setiap balon yang ditekan menambah skor.",
          "Balon terus muncul selama permainan berjalan.",
          "Tampilkan skor di layar."
        ]
      },
      {
        id: "ji-4",
        title: "Hewan dan Suara",
        prompt: "Buat aplikasi pengenalan hewan.",
        checklist: [
          "Tampilkan minimal 3 hewan.",
          "Saat hewan ditekan, muncul suara atau teks nama hewan.",
          "Tambahkan tampilan yang ceria dan mudah dipahami."
        ]
      },
      {
        id: "ji-5",
        title: "Jalan ke Rumah",
        prompt: "Buat game sederhana agar karakter bisa sampai ke rumah.",
        checklist: [
          "Karakter harus menghindari minimal 1 rintangan.",
          "Jika berhasil sampai tujuan, tampilkan pesan menang.",
          "Jika menyentuh rintangan, tampilkan pesan coba lagi."
        ]
      }
    ]
  },
  {
    id: "junior-ii",
    label: "Junior-II",
    age: "SD Kelas 3 - SD Kelas 5",
    intro: "Soal menengah untuk melatih aturan main, skor, dan alur fitur yang lebih lengkap.",
    questions: [
      {
        id: "jii-1",
        title: "Game Kumpulkan Koin",
        prompt: "Buat game untuk mengumpulkan koin sambil menghindari musuh.",
        checklist: [
          "Karakter bisa bergerak dengan kontrol yang jelas.",
          "Skor bertambah saat koin diambil.",
          "Permainan berakhir jika menyentuh musuh atau waktu habis."
        ]
      },
      {
        id: "jii-2",
        title: "Kuis Matematika Cepat",
        prompt: "Buat aplikasi kuis berisi minimal 5 pertanyaan matematika sederhana.",
        checklist: [
          "Tampilkan skor jawaban benar.",
          "Setelah semua soal selesai, tampilkan hasil akhir.",
          "Beri feedback 'Benar' atau 'Salah' di setiap jawaban."
        ]
      },
      {
        id: "jii-3",
        title: "Game Labirin",
        prompt: "Buat game labirin dengan titik mulai dan titik selesai.",
        checklist: [
          "Pemain harus mencari jalan keluar tanpa menyentuh dinding.",
          "Jika menyentuh dinding, pemain kembali ke awal atau nyawa berkurang.",
          "Tambahkan level menang saat keluar dari labirin."
        ]
      },
      {
        id: "jii-4",
        title: "Simulator Kasir Mini",
        prompt: "Buat aplikasi kasir sederhana.",
        checklist: [
          "Pengguna bisa memilih minimal 3 barang.",
          "Total belanja dihitung otomatis.",
          "Tampilkan struk singkat atau ringkasan belanja."
        ]
      },
      {
        id: "jii-5",
        title: "Tangkap Sampah",
        prompt: "Buat game bertema menjaga kebersihan.",
        checklist: [
          "Pemain menangkap sampah yang jatuh.",
          "Skor bertambah saat sampah tertangkap, dan berkurang jika ada yang terlewat.",
          "Tampilkan hasil akhir setelah waktu permainan selesai."
        ]
      }
    ]
  },
  {
    id: "junior-iii",
    label: "Junior-III",
    age: "SD Kelas 6 - SMP Kelas 2",
    intro: "Soal lanjut untuk melatih struktur logika, validasi, dan sistem game/aplikasi yang lebih matang.",
    questions: [
      {
        id: "jiii-1",
        title: "Game Survival Arena",
        prompt: "Buat game survival sederhana.",
        checklist: [
          "Pemain harus bertahan hidup selama waktu tertentu.",
          "Tambahkan musuh atau rintangan yang bergerak.",
          "Tampilkan nyawa, skor, dan kondisi game over."
        ]
      },
      {
        id: "jiii-2",
        title: "Aplikasi To-Do List Pintar",
        prompt: "Buat aplikasi pencatat tugas.",
        checklist: [
          "Pengguna bisa menambah, menandai selesai, dan menghapus tugas.",
          "Tampilkan daftar tugas yang masih aktif.",
          "Tambahkan kategori atau prioritas sederhana."
        ]
      },
      {
        id: "jiii-3",
        title: "Game Misi Bertahap",
        prompt: "Buat game dengan minimal 3 objective yang harus diselesaikan berurutan.",
        checklist: [
          "Setiap objective harus memberi progress yang jelas.",
          "Pemain hanya bisa lanjut jika objective sebelumnya selesai.",
          "Tampilkan status menang saat semua objective selesai."
        ]
      },
      {
        id: "jiii-4",
        title: "Simulasi Pemesanan Makanan",
        prompt: "Buat aplikasi pemesanan makanan sederhana.",
        checklist: [
          "Pengguna bisa memilih menu, jumlah, dan melihat total harga.",
          "Tambahkan validasi agar jumlah pesanan tidak kosong.",
          "Tampilkan ringkasan pesanan sebelum selesai."
        ]
      },
      {
        id: "jiii-5",
        title: "Game Power-Up Challenge",
        prompt: "Buat game dengan item khusus seperti power-up, shield, atau boost.",
        checklist: [
          "Pemain harus memanfaatkan item untuk mencapai target skor.",
          "Tambahkan aturan yang jelas untuk penggunaan item.",
          "Tampilkan perbedaan kondisi saat item aktif dan tidak aktif."
        ]
      }
    ]
  }
];
