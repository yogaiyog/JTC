export type TimelinePhase = {
  id: string;
  title: string;
  start: string;
  end: string;
  progress: number;
  activities: string[];
};

export const timelinePhases: TimelinePhase[] = [
  {
    id: "persiapan-sistem",
    title: "Persiapan Sistem",
    start: "2026-06-10",
    end: "2026-06-30",
    progress: 100,
    activities: [
      "Landing page production ready",
      "Domain aktif",
      "Google Form production ready",
      "Apps Script email otomatis production ready"
    ]
  },
  {
    id: "persiapan-operasional",
    title: "Persiapan Operasional",
    start: "2026-06-10",
    end: "2026-06-30",
    progress: 100,
    activities: [
      "Penyusunan rulebook lomba",
      "Penyusunan rubrik penilaian",
      "Penyusunan soal lomba",
      "Desain poster",
      "Video promosi",
      "Rekrut juri",
      "Penyusunan FAQ peserta"
    ]
  },
  {
    id: "nice-to-have-cv-pt",
    title: "Nice to Have",
    start: "2026-06-10",
    end: "2026-06-30",
    progress: 100,
    activities: [
      "Pembuatan CV/PT",
      "Rekening bisnis/ bank jago wallet kalau ga ada",
      "Invoice resmi",
      "Media kit sponsor"
    ]
  },
  {
    id: "pre-launch",
    title: "Pre Launch",
    start: "2026-07-01",
    end: "2026-07-05",
    progress: 100,
    activities: [
      "Soft launching website",
      "Testing pendaftaran",
      "Publikasi teaser",
      "Publikasi ke komunitas dan sekolah"
    ]
  },
  {
    id: "registration",
    title: "Registrasi Peserta",
    start: "2026-07-06",
    end: "2026-08-17",
    progress: 100,
    activities: [
      "Pembukaan pendaftaran",
      "Promosi media sosial",
      "Outreach sekolah",
      "Outreach tempat les coding",
      "Follow-up sekolah",
      "Campaign media sosial",
      "Reminder pembayaran",
      "Last call pendaftaran",
      "Publikasi jumlah peserta sementara"
    ]
  },
  {
    id: "verifikasi-peserta",
    title: "Verifikasi Peserta",
    start: "2026-08-18",
    end: "2026-08-20",
    progress: 100,
    activities: [
      "Final Check Verifikasi pembayaran",
      "Final Check Validasi data peserta",
      "Finalisasi database peserta"
    ]
  },
  {
    id: "administrasi",
    title: "Administrasi",
    start: "2026-07-06",
    end: "2026-08-17",
    progress: 100,
    activities: [
      "Final Check Generate nomor peserta",
      "Pembagian grup WhatsApp atau Telegram",
      "Pengiriman email peserta resmi"
    ]
  },
  {
    id: "technical-meeting-1",
    title: "Technical Meeting 1",
    start: "2026-08-22",
    end: "2026-08-22",
    progress: 100,
    activities: [
      "Penjelasan aturan lomba",
      "Penjelasan jadwal",
      "Penjelasan sistem lomba",
      "Simulasi platform",
      "Sesi tanya jawab"
    ]
  },
  {
    id: "persiapan-final",
    title: "Persiapan Final",
    start: "2026-08-23",
    end: "2026-08-25",
    progress: 100,
    activities: [
      "Finalisasi soal",
      "Finalisasi rubrik",
      "Finalisasi juri",
      "Pengecekan sistem"
    ]
  },
  {
    id: "technical-meeting-2",
    title: "Technical Meeting 2 (Opsional)",
    start: "2026-08-26",
    end: "2026-08-26",
    progress: 100,
    activities: [
      "Simulasi terakhir",
      "Troubleshooting peserta"
    ]
  },
  {
    id: "gladi-bersih",
    title: "Gladi Bersih",
    start: "2026-08-27",
    end: "2026-08-29",
    progress: 100,
    activities: [
      "Uji coba platform",
      "Briefing panitia",
      "Pengecekan meeting room",
      "Backup plan internet dan komunikasi"
    ]
  },
  {
    id: "hari-h-lomba",
    title: "Pelaksanaan Lomba",
    start: "2026-08-30",
    end: "2026-08-30",
    progress: 100,
    activities: [
      "Registrasi peserta",
      "Opening",
      "Babak penyisihan",
      "Penilaian",
      "Babak final",
      "Pengumuman pemenang"
    ]
  },
  {
    id: "pasca-acara",
    title: "Pasca Acara",
    start: "2026-08-31",
    end: "2026-09-07",
    progress: 100,
    activities: [
      "Pengiriman sertifikat",
      "Pengiriman hadiah",
      "Publikasi pemenang",
      "Survey peserta",
      "Evaluasi internal"
    ]
  },
  {
    id: "evaluasi-dan-pengembangan",
    title: "Evaluasi & Pengembangan",
    start: "2026-09-08",
    end: "2026-09-15",
    progress: 100,
    activities: [
      "Penyusunan laporan Season 1",
      "Evaluasi internal",
      "Pembukaan pre-registration JTC Season 2"
    ]
  }
];
