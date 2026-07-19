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

export type TrainingVideo = {
  id: string;
  title: string;
  description: string;
  src: string;
};

export const trainingVideoSlides: TrainingVideo[] = [
  {
    id: "submit-karya",
    title: "JUNIOR-I",
    description: "Panduan pengerjaan soal lomba kelas 1-3 SD",
    src:
      process.env.NEXT_PUBLIC_JUNIOR_I ??
      "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE"
  },
  {
    id: "ngerjain-soal",
    title: "JUNIOR-II",
    description: "Panduan pengerjaan soal lomba kelas 4-6 SD",
    src:
      process.env.NEXT_PUBLIC_JUNIOR_II ??
      "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?start=32"
  },
  {
    id: "tips-latihan",
    title: "JUNIOR-III",
    description: "Panduan pengerjaan soal lomba kelas 7-9 SMP",
    src:
      process.env.NEXT_PUBLIC_JUNIOR_III ??
      "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?start=64"
  }
];

export const trainingVideos = {
  submitKarya: trainingVideoSlides[0].src,
  ngerjainSoal: trainingVideoSlides[1].src,
  tipsLatihan: trainingVideoSlides[2].src
} as const;

export const questionLevels: QuestionLevel[] = [
  {
    id: "junior-i",
    label: "Junior-I",
    age: "SD Kelas 1 - SD Kelas 3",
    intro:
      "Latihan ringan untuk membiasakan peserta dengan gerak dasar, interaksi sederhana, dan tampilan yang mudah dipahami. Materi ini berbeda dari soal lomba resmi.",
    questions: [
      {
        id: "ji-1",
        title: "Pilih Buah Favorit",
        prompt: "Buat aplikasi sederhana untuk memilih buah favorit.",
        checklist: [
          "Tampilkan minimal 3 gambar atau tombol buah.",
          "Saat salah satu buah dipilih, tampilkan pesan pilihan pemain.",
          "Tambahkan warna atau dekorasi yang ceria."
        ]
      },
      {
        id: "ji-2",
        title: "Lampu Lalu Lintas Mini",
        prompt: "Buat simulasi lampu lalu lintas sederhana.",
        checklist: [
          "Tampilkan warna merah, kuning, dan hijau.",
          "Saat tombol ditekan, warna aktif berubah sesuai pilihan.",
          "Tambahkan teks penjelasan seperti 'Berhenti' atau 'Jalan'."
        ]
      },
      {
        id: "ji-3",
        title: "Hitung Hewan",
        prompt: "Buat permainan sederhana untuk menghitung jumlah hewan di layar.",
        checklist: [
          "Tampilkan beberapa hewan dengan jumlah tertentu.",
          "Sediakan minimal 3 pilihan jawaban angka.",
          "Tampilkan pesan benar atau salah setelah pemain memilih."
        ]
      },
      {
        id: "ji-4",
        title: "Cuaca Hari Ini",
        prompt: "Buat aplikasi interaktif tentang pilihan cuaca.",
        checklist: [
          "Tampilkan minimal 3 kondisi cuaca.",
          "Saat cuaca dipilih, tampilkan ikon atau teks yang sesuai.",
          "Gunakan tampilan yang mudah dibaca anak-anak."
        ]
      },
      {
        id: "ji-5",
        title: "Cari Jalan ke Sekolah",
        prompt: "Buat game sederhana agar karakter bisa menuju sekolah.",
        checklist: [
          "Karakter bisa bergerak menuju tujuan.",
          "Tambahkan minimal 1 rintangan yang harus dihindari.",
          "Tampilkan pesan berhasil saat sampai tujuan."
        ]
      }
    ]
  },
  {
    id: "junior-ii",
    label: "Junior-II",
    age: "SD Kelas 4 - SD Kelas 6",
    intro:
      "Latihan menengah untuk membangun logika aturan, penghitungan skor, dan alur aplikasi yang lebih rapi. Materi ini bukan salinan soal resmi lomba.",
    questions: [
      {
        id: "jii-1",
        title: "Tangkap Sampah",
        prompt: "Buat game bertema menjaga kebersihan",
        checklist: [
       "Buat game bertema menjaga kebersihan.",
"Pemain menangkap sampah yang jatuh.",
"Skor bertambah saat sampah tertangkap",
"Tampilkan hasil akhir setelah waktu permainan selesai."
        ]
      },
    ]
  },
  {
    id: "junior-iii",
    label: "Junior-III",
    age: "SMP Kelas 7 - SMP Kelas 9",
    intro:
      "Latihan lanjut untuk membiasakan peserta menyusun sistem, validasi, dan alur fitur yang lebih matang. Kontennya dibuat berbeda dari dokumen soal lomba.",
    questions: [
      {
        id: "jiii-1",
        title: "Quiz Matematika",
        prompt: "Buat game sederhana kuis matematika dengan beberapa pertanyaan.",
        checklist: [
  "Buat aplikasi kuis berisi minimal 5 pertanyaan matematika sederhana.",
"Tampilkan skor jawaban benar.",
"Setelah semua soal selesai, tampilkan hasil akhir.",
"Beri feedback 'Benar' atau 'Salah' di setiap jawaban."
        ]
      },
    ]
  }
];
