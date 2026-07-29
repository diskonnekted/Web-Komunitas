import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const news = [
  {
    title: "Pembinaan PIK-R di Padukuhan Watupecah Pondokrejo",
    slug: "pembinaan-pik-r-padukuhan-watupecah-pondokrejo",
    content: "Hari Minggu, 14 Juli 2024 pukul 19.30 WIB - selesai, di Padukuhan Watupecah, Pondokrejo, Kalurahan Pondokrejo bersama PIK-R Kapanewon Tempel melakukan Pembinaan PIK-R.\n\nPembinaan PIK-R di Padukuhan Watupecah ini bertempat di Kediaman Bapak Dukuh Padukuhan Watupecah yang dihadiri 35 peserta.\n\nPIK-R adalah singkatan dari Pusat Informasi Konseling Remaja dan menjadi suatu wadah kegiatan program PKBR (Penyiapan Kehidupan Berkeluarga Bagi Remaja) yang dikelola dari, oleh dan untuk remaja guna memberikan pelayanan informasi dan konseling kesehatan reproduksi serta penyiapan kehidupan berkeluarga.\n\nManfaat PIK-R:\n- Tempat untuk mencari solusi permasalahan yang dihadapi\n- Merencanakan masa depan\n- Memperoleh pengetahuan tentang hidup sehat bagi kalangan anak usia remaja\n\nTujuan PIK-R:\n- Meningkatnya kemampuan PIK Remaja dalam mengembangkan materi dan isi pesan Program GenRe\n- Meningkatnya kemampuan PIK Remaja dalam mengembangkan kegiatan yang lebih inovatif dan kreatif\n- Meningkatnya minat remaja untuk aktif dalam kegiatan dan pengelolaan PIK Remaja\n\nDengan adanya kegiatan ini diharapkan PIK-R yang ada di Kalurahan Pondokrejo menjadi lebih inovatif dan kreatif serta bisa menjadi contoh bagi remaja-remaja yang lainnya dan bisa mengurangi kenakalan remaja serta meningkatkan kesehatan remaja di Kalurahan Pondokrejo.",
    excerpt: "Kegiatan pembinaan PIK-R di Padukuhan Watupecah dihadiri 35 peserta. PIK-R sebagai wadah program PKBR untuk remaja dalam pelayanan informasi dan konseling kesehatan reproduksi.",
    image: "/news/pembinaan-pik-r-watupecah.jpeg",
    author: "Admin",
    category: "kegiatan",
    views: 0,
    isPublished: true,
    publishedAt: new Date("2024-07-14T19:30:00Z"),
  },
  {
    title: "Pembinaan PIK-R di Padukuhan Dukuh Pondokrejo",
    slug: "pembinaan-pik-r-padukuhan-dukuh-pondokrejo",
    content: "Hari Jumat, 12 Juli 2024 pukul 19.30 WIB - selesai, di Padukuhan Dukuh, Pondokrejo. Kalurahan Pondokrejo bersama PIK-R Kapanewon Tempel melakukan Pembinaan PIK-R.\n\nPembinaan PIK-R di Padukuhan Dukuh ini bertempat di Kediaman Bapak Dukuh Padukuhan Dukuh yang dihadiri 40 peserta.\n\nPIK-R adalah singkatan dari Pusat Informasi Konseling Remaja dan menjadi suatu wadah kegiatan program PKBR (Penyiapan Kehidupan Berkeluarga Bagi Remaja) yang dikelola dari, oleh dan untuk remaja guna memberikan pelayanan informasi dan konseling kesehatan reproduksi serta penyiapan kehidupan berkeluarga.\n\nManfaat PIK-R:\n- Tempat untuk mencari solusi permasalahan yang dihadapi\n- Merencanakan masa depan\n- Memperoleh pengetahuan tentang hidup sehat bagi kalangan anak usia remaja\n\nTujuan PIK-R:\n- Meningkatnya kemampuan PIK Remaja dalam mengembangkan materi dan isi pesan Program GenRe\n- Meningkatnya kemampuan PIK Remaja dalam mengembangkan kegiatan yang lebih inovatif dan kreatif\n- Meningkatnya minat remaja untuk aktif dalam kegiatan dan pengelolaan PIK Remaja\n\nDengan adanya kegiatan ini diharapkan PIK-R yang ada di Kalurahan Pondokrejo menjadi lebih inovatif dan kreatif serta bisa menjadi contoh bagi remaja-remaja yang lainnya dan bisa mengurangi kenakalan remaja serta meningkatkan kesehatan-kesehatan remaja di Kalurahan Pondokrejo.",
    excerpt: "Pembinaan PIK-R di Padukuhan Dukuh dihadiri 40 peserta. PIK-R sebagai wadah program PKBR untuk remaja dalam pelayanan informasi dan konseling kesehatan reproduksi.",
    image: "/news/pembinaan-pik-r-pondokrejo-2.jpeg",
    author: "Admin",
    category: "kegiatan",
    views: 0,
    isPublished: true,
    publishedAt: new Date("2024-07-12T19:30:00Z"),
  },
  {
    title: "Rapat Koordinasi Karang Taruna Pondokrejo Persiapan Porkal Tahun 2025",
    slug: "rapat-koordinasi-karang-taruna-pondokrejo-persiapan-porkal-tahun-2025",
    content: "Kalurahan Pondokrejo Kamis, 19 Juni 2025 di Kalurahan Pondokrejo mengadakan koordinasi Karang Taruna untuk persiapan Porkal tahun 2025. Pada acara ini dihadiri oleh Lurah Kalurahan Pondokrejo, Kamitua, Ketua Karang Taruna beserta anggotanya. Dalam pertemuan ini membahas struktur kepengurusan Porkal dan membahas jenis lomba pada Porkal tahun ini.",
    excerpt: "Koordinasi Karang Taruna Pondokrejo dalam persiapan Pekan Olahraga Kalurahan (Porkal) tahun 2025.",
    image: "/karangtaruna1.jpg",
    author: "Admin",
    category: "pengumuman",
    views: 0,
    isPublished: true,
    publishedAt: new Date("2025-06-24T00:00:00Z"),
  },
  {
    title: "Pembinaan PIK-R di Padukuhan Jlapan Pondokrejo",
    slug: "pembinaan-pik-r-padukuhan-jlapan-pondokrejo",
    content: "Hari Rabu, 10 Juli 2024 pukul 19.30 WIB - selesai, Kalurahan Pondokrejo bersama PIK-R Kapanewon Tempel melakukan Pembinaan PIK-R.\n\nPembinaan PIK-R di Padukuhan Jlapan ini bertempat di Pendopo RW 12 Padukuhan Jlapan yang dihadiri 70 peserta.\n\nPIK-R adalah singkatan dari Pusat Informasi Konseling Remaja dan menjadi suatu wadah kegiatan program PKBR (Penyiapan Kehidupan Berkeluarga Bagi Remaja) yang dikelola dari, oleh dan untuk remaja guna memberikan pelayanan informasi dan konseling kesehatan reproduksi serta penyiapan kehidupan berkeluarga.\n\nManfaat PIK-R:\n- Tempat untuk mencari solusi permasalahan yang dihadapi\n- Merencanakan masa depan\n- Memperoleh pengetahuan tentang hidup sehat bagi kalangan anak usia remaja\n\nTujuan PIK-R:\n- Meningkatnya kemampuan PIK Remaja dalam mengembangkan materi dan isi pesan Program GenRe\n- Meningkatnya kemampuan PIK Remaja dalam mengembangkan kegiatan yang lebih inovatif dan kreatif\n- Meningkatnya minat remaja untuk aktif dalam kegiatan dan pengelolaan PIK Remaja\n\nDengan adanya kegiatan ini diharapkan PIK-R yang ada di Kalurahan Pondokrejo menjadi lebih inovatif dan kreatif serta bisa menjadi contoh bagi remaja-remaja yang lainnya dan bisa mengurangi kenakalan remaja serta meningkatkan kesehatan-kesehatan remaja di Kalurahan Pondokrejo.",
    excerpt: "Pembinaan PIK-R di Padukuhan Jlapan dihadiri 70 peserta. PIK-R sebagai wadah program PKBR untuk remaja dalam pelayanan informasi dan konseling kesehatan reproduksi.",
    image: "/news/pembinaan-pik-r-jlapan.jpeg",
    author: "Admin",
    category: "kegiatan",
    views: 0,
    isPublished: true,
    publishedAt: new Date("2024-07-10T19:30:00Z"),
  },
  {
    title: "Pembinaan PIK-R di Padukuhan Karanglo Pondokrejo",
    slug: "pembinaan-pik-r-padukuhan-karanglo-pondokrejo",
    content: "Hari Jum'at, 05 Juli 2024 pukul 19.30 WIB - selesai, Kalurahan Pondokrejo bersama PIK-R Kapanewon Tempel melakukan Pembinaan PIK-R.\n\nPembinaan PIK-R di Padukuhan Karanglo bertempat di rumah ibu R. Sriwahyuni yang dihadiri 45 peserta dari usia remaja.\n\nPIK-R adalah singkatan dari Pusat Informasi Konseling Remaja dan menjadi suatu wadah kegiatan program PKBR (Penyiapan Kehidupan Berkeluarga Bagi Remaja) yang dikelola dari, oleh dan untuk remaja guna memberikan pelayanan informasi dan konseling kesehatan reproduksi serta penyiapan kehidupan berkeluarga.\n\nManfaat PIK-R:\n- Tempat untuk mencari solusi permasalahan yang dihadapi\n- Merencanakan masa depan\n- Memperoleh pengetahuan tentang hidup sehat bagi kalangan anak usia remaja\n\nTujuan PIK-R:\n- Meningkatnya kemampuan PIK Remaja dalam mengembangkan materi dan isi pesan Program GenRe\n- Meningkatnya kemampuan PIK Remaja dalam mengembangkan kegiatan yang lebih inovatif dan kreatif\n- Meningkatnya minat remaja untuk aktif dalam kegiatan dan pengelolaan PIK Remaja\n\nDengan adanya kegiatan ini diharapkan PIK-R yang ada di Kalurahan Pondokrejo menjadi lebih inovatif dan kreatif serta bisa menjadi contoh bagi remaja-remaja yang lainnya dan bisa mengurangi kenakalan remaja serta meningkatkan kesehatan-kesehatan remaja di Kalurahan Pondokrejo.",
    excerpt: "Pembinaan PIK-R di Padukuhan Karanglo dihadiri 45 peserta remaja. PIK-R sebagai wadah program PKBR untuk remaja dalam pelayanan informasi dan konseling kesehatan reproduksi.",
    image: "/news/pembinaan-pik-r-karanglo.jpeg",
    author: "Admin",
    category: "kegiatan",
    views: 0,
    isPublished: true,
    publishedAt: new Date("2024-07-05T19:30:00Z"),
  },
];

const communities = [
  // 1. Komunitas Pertanian & Lingkungan
  {
    name: "Gapoktan Pondokrejo",
    slug: "gapoktan-pondokrejo",
    category: "PERTANIAN",
    description: "Gabungan Kelompok Tani untuk petani padi, sayur, atau tanaman hias. Membantu dalam penyediaan bibit, pupuk, dan pemasaran hasil panen.",
    contact: "Budi Santoso",
    phone: "0812-3456-7890",
    email: "gapoktan@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Hidroponik Perkotaan",
    slug: "hidroponik-perkotaan",
    category: "PERTANIAN",
    description: "Komunitas menanam sayur di lahan sempit/pekarangan rumah menggunakan sistem hidroponik. Edukasi teknik bercocok tanam modern.",
    contact: "Ahmad Tani",
    phone: "0813-4567-8901",
    email: "hidroponik@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Bank Sampah Pondokrejo",
    slug: "bank-sampah-pondokrejo",
    category: "LINGKUNGAN",
    description: "Kelompok pengelola sampah rumah tangga dengan kegiatan daur ulang, kompos, dan edukasi lingkungan untuk warga.",
    contact: "Siti Green",
    phone: "0814-5678-9012",
    email: "banksampah@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Penanaman Pohon & Pelestarian Sungai",
    slug: "penanaman-pohon-sungai",
    category: "LINGKUNGAN",
    description: "Komunitas peduli lingkungan yang fokus pada menjaga ekosistem lokal melalui penanaman pohon dan pelestarian sungai.",
    contact: "Eko Hijau",
    phone: "0815-6789-0123",
    email: "lingkungan@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  
  // 2. Komunitas Ekonomi & UMKM
  {
    name: "UMKM Pondokrejo",
    slug: "umkm-pondokrejo",
    category: "EKONOMI",
    description: "Kelompok UMKM Pondokrejo yang beranggotakan pelaku usaha makanan, kerajinan, batik, souvenir, jasa jahit, dll.",
    contact: "Rina Ekonomi",
    phone: "0816-7890-1234",
    email: "umkm@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Ibu-ibu Pengrajin",
    slug: "ibu-ibu-pengrajin",
    category: "EKONOMI",
    description: "Komunitas ibu-ibu pembuat produk lokal seperti anyaman, batik tulis, atau kue tradisional untuk melestarikan kerajinan.",
    contact: "Dewi Craft",
    phone: "0817-8901-2345",
    email: "pengrajin@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Warung Digital Warga",
    slug: "warung-digital-warga",
    category: "EKONOMI",
    description: "Pelatihan jualan online untuk warga di platform Shopee, Tokopedia, dan Instagram untuk meningkatkan penjualan UMKM.",
    contact: "Rizki Digital",
    phone: "0818-9012-3456",
    email: "digital@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Koperasi Simpan Pinjam Warga",
    slug: "koperasi-simpan-pinjam",
    category: "EKONOMI",
    description: "Koperasi simpan pinjam untuk membantu modal usaha mikro warga dengan bunga ringan dan proses mudah.",
    contact: "Hendra Koperasi",
    phone: "0819-0123-4567",
    email: "koperasi@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  
  // 3. Komunitas Digital & Literasi
  {
    name: "Internet Marketing Desa",
    slug: "internet-marketing-desa",
    category: "DIGITAL",
    description: "Komunitas pelatihan konten, SEO, dan media sosial untuk UMKM. Membantu warga memasarkan produk secara digital.",
    contact: "Fajar Online",
    phone: "0821-2345-6789",
    email: "marketingdigital@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Rumah Belajar Digital",
    slug: "rumah-belajar-digital",
    category: "DIGITAL",
    description: "Untuk anak-anak & remaja: pelatihan coding dasar, desain grafis, dan editing video untuk meningkatkan literasi digital.",
    contact: "Maya Tech",
    phone: "0822-3456-7890",
    email: "digitallearning@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Literasi Baca-Tulis",
    slug: "literasi-baca-tulis",
    category: "PENDIDIKAN",
    description: "Komunitas membaca buku, menulis cerita lokal, dan penerbitan majalah warga untuk meningkatkan minat baca.",
    contact: "Rina Literasi",
    phone: "0823-4567-8901",
    email: "literasi@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Fotografi & Dokumentasi Desa",
    slug: "fotografi-dokumentasi",
    category: "DIGITAL",
    description: "Komunitas fotografi untuk mendokumentasikan kegiatan, budaya, dan sejarah lokal Kalurahan Pondokrejo.",
    contact: "Bagus Foto",
    phone: "0824-5678-9012",
    email: "fotografi@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  
  // 4. Komunitas Olahraga & Kesehatan
  {
    name: "Senam Sehat Lansia",
    slug: "senam-sehat-lansia",
    category: "KESEHATAN",
    description: "Komunitas senam sehat untuk lansia dan ibu-ibu yang rutin dilaksanakan setiap pagi di balai kalurahan.",
    contact: "Ibu Siti",
    phone: "0825-6789-0123",
    email: "senam@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Sepeda Santai Pondokrejo",
    slug: "sepeda-santai-pondokrejo",
    category: "OLAHRAGA",
    description: "Komunitas gowes bareng tiap minggu untuk menjaga kesehatan dan menjalin silaturahmi antar warga.",
    contact: "Ahmad Cycling",
    phone: "0826-7890-1234",
    email: "gowes@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Klub Futsal Warga",
    slug: "klub-futsal-warga",
    category: "OLAHRAGA",
    description: "Klub futsal untuk anak muda dan dewasa dengan rutinitas latihan dan pertandingan antar RT.",
    contact: "Budi Futsal",
    phone: "0827-8901-2345",
    email: "futsal@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Jalan Sehat & Lari",
    slug: "jalan-sehat-lari",
    category: "OLAHRAGA",
    description: "Komunitas jalan sehat dan lari untuk semua usia dengan kegiatan rutin setiap pagi hari.",
    contact: "Eko Runner",
    phone: "0828-9012-3456",
    email: "lari@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Posyandu Remaja & Lansia",
    slug: "posyandu-remaja-lansia",
    category: "KESEHATAN",
    description: "Edukasi kesehatan reproduksi, stunting, dan kesehatan lansia untuk meningkatkan kualitas hidup warga.",
    contact: "Dokter Siti",
    phone: "0829-0123-4567",
    email: "posyandu@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  
  // 5. Komunitas Keagamaan & Sosial
  {
    name: "Taman Terasa Ngaji (TTG)",
    slug: "taman-terasa-ngaji",
    category: "RELIGI",
    description: "Pengajian rutin untuk anak-anak & remaja dengan metode yang menyenangkan dan interaktif.",
    contact: "Ustad Ahmad",
    phone: "0831-2345-6789",
    email: "ttg@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Majelis Taklim Ibu-ibu",
    slug: "majelis-taklim-ibu-ibu",
    category: "RELIGI",
    description: "Kajian agama mingguan untuk ibu-ibu dengan fokus pada pendidikan karakter dan keluarga sakinah.",
    contact: "Ibu Aminah",
    phone: "0832-3456-7890",
    email: "taklim@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Komunitas Remaja Masjid",
    slug: "komunitas-remaja-masjid",
    category: "RELIGI",
    description: "Pengelola masjid, kegiatan sosial, dan bakti sosial yang digerakkan oleh para remaja masjid.",
    contact: "Yusuf Remaja",
    phone: "0833-4567-8901",
    email: "krm@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Kelompok Doa Antariman",
    slug: "kelompok-doa-antariman",
    category: "RELIGI",
    description: "Komunitas untuk memperkuat toleransi dan kerukunan antar umat beragama di Kalurahan Pondokrejo.",
    contact: "Budi Toleransi",
    phone: "0834-5678-9012",
    email: "doa@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Sedekah & Bantuan Sosial",
    slug: "sedekah-bantuan-sosial",
    category: "SOSIAL",
    description: "Komunitas pengumpulan dan penyaluran sembako, bantuan untuk warga sakit/miskin secara rutin.",
    contact: "Ibu Sosial",
    phone: "0835-6789-0123",
    email: "sedekah@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  
  // 6. Komunitas Seni, Budaya & Tradisi
  {
    name: "Karawitan Tradisional",
    slug: "karawitan-tradisional",
    category: "BUDAYA",
    description: "Melestarikan kesenian karawitan, jathilan, gejog lesung, reog mini, atau tari tradisional khas Yogyakarta.",
    contact: "Pak Seni",
    phone: "0836-7890-1234",
    email: "karawitan@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Teater Rakyat",
    slug: "teater-rakyat",
    category: "BUDAYA",
    description: "Komunitas teater rakyat dan drama warga yang rutin pentas di acara-acara desa dan hari besar.",
    contact: "Rina Teater",
    phone: "0837-8901-2345",
    email: "teater@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Musik Kampung",
    slug: "musik-kampung",
    category: "BUDAYA",
    description: "Komunitas musik dengan alat rebana, campursari, dan band akustik untuk mengembangkan bakat musik warga.",
    contact: "Ahmad Musik",
    phone: "0838-9012-3456",
    email: "musik@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Batik & Kerajinan Lokal",
    slug: "batik-kerajinan-lokal",
    category: "BUDAYA",
    description: "Komunitas pengembangan batik dan kerajinan lokal dengan motif khas Sleman/Pondokrejo.",
    contact: "Ibu Batik",
    phone: "0839-0123-4567",
    email: "batik@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  
  // 7. Komunitas Keluarga & Pemberdayaan
  {
    name: "PAUD Swadaya",
    slug: "paud-swadaya",
    category: "KELUARGA",
    description: "Pos Pendidikan Anak Usia Dini yang dikelola oleh ibu-ibu kader untuk pendidikan early childhood.",
    contact: "Ibu Guru",
    phone: "0841-2345-6789",
    email: "paud@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Parenting Warga",
    slug: "parenting-warga",
    category: "KELUARGA",
    description: "Komunitas diskusi tumbuh kembang anak dan pola asuh untuk orang tua di Kalurahan Pondokrejo.",
    contact: "Dokter Ani",
    phone: "0842-3456-7890",
    email: "parenting@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "PKK Aktif",
    slug: "pkk-aktif",
    category: "KELUARGA",
    description: "Kelompok PKK aktif dengan kegiatan pemanfaatan pekarangan dan diversifikasi pangan untuk keluarga sejahtera.",
    contact: "Ibu PKK",
    phone: "0843-4567-8901",
    email: "pkk@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Lansia Bahagia",
    slug: "lansia-bahagia",
    category: "KELUARGA",
    description: "Komunitas lansia dengan kegiatan sosial & rekreasi untuk meningkatkan kualitas hidup para lansia.",
    contact: "Bapak Lansia",
    phone: "0844-5678-9012",
    email: "lansia@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  
  // 8. Komunitas Pemuda & Inovasi
  {
    name: "Karang Taruna Pondokrejo",
    slug: "karang-taruna-pondokrejo",
    category: "PEMUDA",
    description: "Organisasi kepemudaan resmi desa yang menjadi basis utama penggerak kegiatan pemuda dan kemasyarakatan.",
    contact: "Dwi Pratama",
    phone: "0845-6789-0123",
    email: "karangtaruna@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Startup Desa",
    slug: "startup-desa",
    category: "INOVASI",
    description: "Komunitas inovasi warga muda dengan ide teknologi sederhana untuk pertanian, UMKM, atau pariwisata.",
    contact: "Rizki Startup",
    phone: "0846-7890-1234",
    email: "startup@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Relawan Bencana Desa",
    slug: "relawan-bencana-desa",
    category: "PEMUDA",
    description: "Komunitas siaga bencana untuk penanggulangan banjir, gempa, kebakaran di tingkat desa.",
    contact: "Ahmad Relawan",
    phone: "0847-8901-2345",
    email: "relawan@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Edukasi Anti Narkoba",
    slug: "edukasi-anti-narkoba",
    category: "PEMUDA",
    description: "Komunitas sosialisasi bahaya narkoba di sekolah & kalangan remaja untuk menciptakan generasi bersih.",
    contact: "Budi Anti Narkoba",
    phone: "0848-9012-3456",
    email: "antinarkoba@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  
  // 9. Komunitas Khusus Tematik
  {
    name: "Sepeda Ontel Antik",
    slug: "sepeda-ontel-antik",
    category: "LAINNYA",
    description: "Komunitas hobi sepeda ontel antik sekaligus edukasi sejarah transportasi tradisional.",
    contact: "Pak Ontel",
    phone: "0849-0123-4567",
    email: "ontel@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Peternak Lele & Ayam Kampung",
    slug: "peternak-lele-ayam",
    category: "PERTANIAN",
    description: "Komunitas budidaya ternak lele dan ayam kampung skala rumahan untuk ketahanan pangan warga.",
    contact: "Pak Ternak",
    phone: "0851-2345-6789",
    email: "ternak@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Wisata Kampung",
    slug: "wisata-kampung",
    category: "INOVASI",
    description: "Komunitas pengembangan homestay, kuliner lokal, dan wisata edukasi di Kalurahan Pondokrejo.",
    contact: "Rina Wisata",
    phone: "0852-3456-7890",
    email: "wisata@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  },
  {
    name: "Bahasa Asing",
    slug: "bahasa-asing",
    category: "PENDIDIKAN",
    description: "Komunitas belajar bahasa Inggris dan Jepang untuk anak muda untuk meningkatkan wawasan global.",
    contact: "Maya Bahasa",
    phone: "0853-4567-8901",
    email: "bahasa@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo"
  }
];

async function main() {
  console.log('Seeding news...');
  
  for (const newArticle of news) {
    await prisma.news.upsert({
      where: { slug: newArticle.slug },
      update: newArticle,
      create: newArticle,
    });
    console.log(`  Seeded: ${newArticle.title}`);
  }
  
  console.log(`\n${news.length} news seeded successfully!`);
  
  // Seed gallery with news images
  console.log('\nSeeding gallery from news images...');
  const imageUrls = news
    .filter(n => n.image)
    .map(n => ({
      title: n.title,
      fileUrl: n.image,
      fileType: 'image/jpeg',
    }));
  
  for (const galleryItem of imageUrls) {
    await prisma.gallery.upsert({
      where: { id: galleryItem.fileUrl },
      update: galleryItem,
      create: {
        ...galleryItem,
        id: galleryItem.fileUrl,
        description: '',
      },
    });
    console.log(`  Seeded gallery: ${galleryItem.title}`);
  }
  
  console.log(`\n${imageUrls.length} gallery items seeded from news!`);
  
  console.log('Seeding communities...');
  
  for (const community of communities) {
    await prisma.community.upsert({
      where: { slug: community.slug },
      update: community,
      create: community,
    });
    console.log(`  Seeded: ${community.name}`);
  }
  
  console.log(`\n${communities.length} communities seeded successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
