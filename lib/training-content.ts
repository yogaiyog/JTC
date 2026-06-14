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
    age: "SD Kelas 3 - SD Kelas 5",
    intro:
      "Latihan menengah untuk membangun logika aturan, penghitungan skor, dan alur aplikasi yang lebih rapi. Materi ini bukan salinan soal resmi lomba.",
    questions: [
      {
        id: "jii-1",
        title: "Game Antar Paket",
        prompt: "Buat game mengantar paket ke tujuan sambil menghindari halangan.",
        checklist: [
          "Pemain bisa menggerakkan karakter dengan kontrol yang jelas.",
          "Skor bertambah setiap paket berhasil diantar.",
          "Permainan selesai jika waktu habis atau karakter terlalu sering menabrak."
        ]
      },
      {
        id: "jii-2",
        title: "Kuis Pengetahuan Umum Anak",
        prompt: "Buat aplikasi kuis dengan minimal 5 pertanyaan pengetahuan umum.",
        checklist: [
          "Setiap pertanyaan memiliki beberapa pilihan jawaban.",
          "Tampilkan skor yang bertambah saat jawaban benar.",
          "Setelah selesai, tampilkan hasil akhir dan jumlah jawaban benar."
        ]
      },
      {
        id: "jii-3",
        title: "Game Menyusun Kata",
        prompt: "Buat permainan untuk menyusun huruf menjadi kata yang benar.",
        checklist: [
          "Sediakan huruf acak yang bisa dipilih pemain.",
          "Periksa apakah susunan huruf sudah sesuai target kata.",
          "Tampilkan feedback berhasil atau coba lagi."
        ]
      },
      {
        id: "jii-4",
        title: "Pencatat Tabungan Mingguan",
        prompt: "Buat aplikasi sederhana untuk mencatat tabungan mingguan.",
        checklist: [
          "Pengguna bisa menambah nominal tabungan.",
          "Total tabungan dihitung otomatis.",
          "Tampilkan ringkasan jumlah tabungan yang sudah terkumpul."
        ]
      },
      {
        id: "jii-5",
        title: "Game Jaga Taman",
        prompt: "Buat game sederhana bertema merawat taman.",
        checklist: [
          "Pemain mengumpulkan item baik seperti air atau pupuk.",
          "Skor berkurang jika mengambil item yang salah.",
          "Tampilkan hasil akhir setelah permainan selesai."
        ]
      }
    ]
  },
  {
    id: "junior-iii",
    label: "Junior-III",
    age: "SD Kelas 6 - SMP Kelas 2",
    intro:
      "Latihan lanjut untuk membiasakan peserta menyusun sistem, validasi, dan alur fitur yang lebih matang. Kontennya dibuat berbeda dari dokumen soal lomba.",
    questions: [
      {
        id: "jiii-1",
        title: "Game Penjaga Basis",
        prompt: "Buat game sederhana di mana pemain menjaga markas dari serangan musuh.",
        checklist: [
          "Markas memiliki nyawa atau durability yang bisa berkurang.",
          "Musuh datang berkala dan memberi tantangan yang jelas.",
          "Tampilkan status skor, nyawa, dan game over."
        ]
      },
      {
        id: "jiii-2",
        title: "Aplikasi Jadwal Belajar",
        prompt: "Buat aplikasi untuk mencatat jadwal belajar harian.",
        checklist: [
          "Pengguna bisa menambah dan menghapus jadwal.",
          "Setiap jadwal memiliki mata pelajaran dan jam belajar.",
          "Tampilkan daftar jadwal yang tersusun rapi."
        ]
      },
      {
        id: "jiii-3",
        title: "Simulasi Peminjaman Buku",
        prompt: "Buat aplikasi sederhana untuk simulasi pinjam buku perpustakaan.",
        checklist: [
          "Pengguna bisa memilih buku dan mengisi nama peminjam.",
          "Tambahkan validasi jika data belum lengkap.",
          "Tampilkan ringkasan peminjaman sebelum dikonfirmasi."
        ]
      },
      {
        id: "jiii-4",
        title: "Game Misi Kota Cerdas",
        prompt: "Buat game dengan beberapa tugas berurutan untuk memperbaiki kota.",
        checklist: [
          "Terdapat minimal 3 misi yang harus diselesaikan berurutan.",
          "Setiap misi memberi perubahan progress yang terlihat.",
          "Tampilkan status selesai saat semua misi beres."
        ]
      },
      {
        id: "jiii-5",
        title: "Simulator Toko Digital",
        prompt: "Buat aplikasi toko digital sederhana dengan beberapa pilihan produk.",
        checklist: [
          "Pengguna bisa memilih produk dan jumlah pembelian.",
          "Total harga dihitung otomatis dengan benar.",
          "Tambahkan validasi dan ringkasan checkout sederhana."
        ]
      }
    ]
  }
];
