"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Filter } from "lucide-react";
import Link from "next/link";

// Mock data for development
const communities = [
  // 1. Komunitas Pertanian & Lingkungan
  {
    id: "1",
    name: "Gapoktan Pondokrejo",
    slug: "gapoktan-pondokrejo",
    category: "PERTANIAN",
    description: "Gabungan Kelompok Tani untuk petani padi, sayur, atau tanaman hias. Membantu dalam penyediaan bibit, pupuk, dan pemasaran hasil panen.",
    contact: "Budi Santoso - 0812-3456-7890",
    email: "gapoktan@pondokrejo.desa.id",
    members: 38,
    logo: null,
    isActive: true
  },
  {
    id: "2",
    name: "Hidroponik Perkotaan",
    slug: "hidroponik-perkotaan",
    category: "PERTANIAN",
    description: "Komunitas menanam sayur di lahan sempit/pekarangan rumah menggunakan sistem hidroponik. Edukasi teknik bercocok tanam modern.",
    contact: "Ahmad Tani - 0813-4567-8901",
    email: "hidroponik@pondokrejo.desa.id",
    members: 22,
    logo: null,
    isActive: true
  },
  {
    id: "3",
    name: "Bank Sampah Pondokrejo",
    slug: "bank-sampah-pondokrejo",
    category: "LINGKUNGAN",
    description: "Kelompok pengelola sampah rumah tangga dengan kegiatan daur ulang, kompos, dan edukasi lingkungan untuk warga.",
    contact: "Siti Green - 0814-5678-9012",
    email: "banksampah@pondokrejo.desa.id",
    members: 31,
    logo: null,
    isActive: true
  },
  {
    id: "4",
    name: "Penanaman Pohon & Pelestarian Sungai",
    slug: "penanaman-pohon-sungai",
    category: "LINGKUNGAN",
    description: "Komunitas peduli lingkungan yang fokus pada menjaga ekosistem lokal melalui penanaman pohon dan pelestarian sungai.",
    contact: "Eko Hijau - 0815-6789-0123",
    email: "lingkungan@pondokrejo.desa.id",
    members: 28,
    logo: null,
    isActive: true
  },
  
  // 2. Komunitas Ekonomi & UMKM
  {
    id: "5",
    name: "UMKM Pondokrejo",
    slug: "umkm-pondokrejo",
    category: "EKONOMI",
    description: "Kelompok UMKM Pondokrejo yang beranggotakan pelaku usaha makanan, kerajinan, batik, souvenir, jasa jahit, dll.",
    contact: "Rina Ekonomi - 0816-7890-1234",
    email: "umkm@pondokrejo.desa.id",
    members: 45,
    logo: null,
    isActive: true
  },
  {
    id: "6",
    name: "Ibu-ibu Pengrajin",
    slug: "ibu-ibu-pengrajin",
    category: "EKONOMI",
    description: "Komunitas ibu-ibu pembuat produk lokal seperti anyaman, batik tulis, atau kue tradisional untuk melestarikan kerajinan.",
    contact: "Dewi Craft - 0817-8901-2345",
    email: "pengrajin@pondokrejo.desa.id",
    members: 33,
    logo: null,
    isActive: true
  },
  {
    id: "7",
    name: "Warung Digital Warga",
    slug: "warung-digital-warga",
    category: "EKONOMI",
    description: "Pelatihan jualan online untuk warga di platform Shopee, Tokopedia, dan Instagram untuk meningkatkan penjualan UMKM.",
    contact: "Rizki Digital - 0818-9012-3456",
    email: "digital@pondokrejo.desa.id",
    members: 25,
    logo: null,
    isActive: true
  },
  {
    id: "8",
    name: "Koperasi Simpan Pinjam Warga",
    slug: "koperasi-simpan-pinjam",
    category: "EKONOMI",
    description: "Koperasi simpan pinjam untuk membantu modal usaha mikro warga dengan bunga ringan dan proses mudah.",
    contact: "Hendra Koperasi - 0819-0123-4567",
    email: "koperasi@pondokrejo.desa.id",
    members: 52,
    logo: null,
    isActive: true
  },
  
  // 3. Komunitas Digital & Literasi
  {
    id: "9",
    name: "Internet Marketing Desa",
    slug: "internet-marketing-desa",
    category: "DIGITAL",
    description: "Komunitas pelatihan konten, SEO, dan media sosial untuk UMKM. Membantu warga memasarkan produk secara digital.",
    contact: "Fajar Online - 0821-2345-6789",
    email: "marketingdigital@pondokrejo.desa.id",
    members: 29,
    logo: null,
    isActive: true
  },
  {
    id: "10",
    name: "Rumah Belajar Digital",
    slug: "rumah-belajar-digital",
    category: "DIGITAL",
    description: "Untuk anak-anak & remaja: pelatihan coding dasar, desain grafis, dan editing video untuk meningkatkan literasi digital.",
    contact: "Maya Tech - 0822-3456-7890",
    email: "digitallearning@pondokrejo.desa.id",
    members: 35,
    logo: null,
    isActive: true
  },
  {
    id: "11",
    name: "Literasi Baca-Tulis",
    slug: "literasi-baca-tulis",
    category: "PENDIDIKAN",
    description: "Komunitas membaca buku, menulis cerita lokal, dan penerbitan majalah warga untuk meningkatkan minat baca.",
    contact: "Rina Literasi - 0823-4567-8901",
    email: "literasi@pondokrejo.desa.id",
    members: 27,
    logo: null,
    isActive: true
  },
  {
    id: "12",
    name: "Fotografi & Dokumentasi Desa",
    slug: "fotografi-dokumentasi",
    category: "DIGITAL",
    description: "Komunitas fotografi untuk mendokumentasikan kegiatan, budaya, dan sejarah lokal Kalurahan Pondokrejo.",
    contact: "Bagus Foto - 0824-5678-9012",
    email: "fotografi@pondokrejo.desa.id",
    members: 23,
    logo: null,
    isActive: true
  },
  
  // 4. Komunitas Olahraga & Kesehatan
  {
    id: "13",
    name: "Senam Sehat Lansia",
    slug: "senam-sehat-lansia",
    category: "KESEHATAN",
    description: "Komunitas senam sehat untuk lansia dan ibu-ibu yang rutin dilaksanakan setiap pagi di balai kalurahan.",
    contact: "Ibu Siti - 0825-6789-0123",
    email: "senam@pondokrejo.desa.id",
    members: 41,
    logo: null,
    isActive: true
  },
  {
    id: "14",
    name: "Sepeda Santai Pondokrejo",
    slug: "sepeda-santai-pondokrejo",
    category: "OLAHRAGA",
    description: "Komunitas gowes bareng tiap minggu untuk menjaga kesehatan dan menjalin silaturahmi antar warga.",
    contact: "Ahmad Cycling - 0826-7890-1234",
    email: "gowes@pondokrejo.desa.id",
    members: 36,
    logo: null,
    isActive: true
  },
  {
    id: "15",
    name: "Klub Futsal Warga",
    slug: "klub-futsal-warga",
    category: "OLAHRAGA",
    description: "Klub futsal untuk anak muda dan dewasa dengan rutinitas latihan dan pertandingan antar RT.",
    contact: "Budi Futsal - 0827-8901-2345",
    email: "futsal@pondokrejo.desa.id",
    members: 48,
    logo: null,
    isActive: true
  },
  {
    id: "16",
    name: "Jalan Sehat & Lari",
    slug: "jalan-sehat-lari",
    category: "OLAHRAGA",
    description: "Komunitas jalan sehat dan lari untuk semua usia dengan kegiatan rutin setiap pagi hari.",
    contact: "Eko Runner - 0828-9012-3456",
    email: "lari@pondokrejo.desa.id",
    members: 39,
    logo: null,
    isActive: true
  },
  {
    id: "17",
    name: "Posyandu Remaja & Lansia",
    slug: "posyandu-remaja-lansia",
    category: "KESEHATAN",
    description: "Edukasi kesehatan reproduksi, stunting, dan kesehatan lansia untuk meningkatkan kualitas hidup warga.",
    contact: "Dokter Siti - 0829-0123-4567",
    email: "posyandu@pondokrejo.desa.id",
    members: 30,
    logo: null,
    isActive: true
  },
  
  // 5. Komunitas Keagamaan & Sosial
  {
    id: "18",
    name: "Taman Terasa Ngaji (TTG)",
    slug: "taman-terasa-ngaji",
    category: "RELIGI",
    description: "Pengajian rutin untuk anak-anak & remaja dengan metode yang menyenangkan dan interaktif.",
    contact: "Ustad Ahmad - 0831-2345-6789",
    email: "ttg@pondokrejo.desa.id",
    members: 35,
    logo: null,
    isActive: true
  },
  {
    id: "19",
    name: "Majelis Taklim Ibu-ibu",
    slug: "majelis-taklim-ibu-ibu",
    category: "RELIGI",
    description: "Kajian agama mingguan untuk ibu-ibu dengan fokus pada pendidikan karakter dan keluarga sakinah.",
    contact: "Ibu Aminah - 0832-3456-7890",
    email: "taklim@pondokrejo.desa.id",
    members: 42,
    logo: null,
    isActive: true
  },
  {
    id: "20",
    name: "Komunitas Remaja Masjid",
    slug: "komunitas-remaja-masjid",
    category: "RELIGI",
    description: "Pengelola masjid, kegiatan sosial, dan bakti sosial yang digerakkan oleh para remaja masjid.",
    contact: "Yusuf Remaja - 0833-4567-8901",
    email: "krm@pondokrejo.desa.id",
    members: 28,
    logo: null,
    isActive: true
  },
  {
    id: "21",
    name: "Kelompok Doa Antariman",
    slug: "kelompok-doa-antariman",
    category: "RELIGI",
    description: "Komunitas untuk memperkuat toleransi dan kerukunan antar umat beragama di Kalurahan Pondokrejo.",
    contact: "Budi Toleransi - 0834-5678-9012",
    email: "doa@pondokrejo.desa.id",
    members: 25,
    logo: null,
    isActive: true
  },
  {
    id: "22",
    name: "Sedekah & Bantuan Sosial",
    slug: "sedekah-bantuan-sosial",
    category: "SOSIAL",
    description: "Komunitas pengumpulan dan penyaluran sembako, bantuan untuk warga sakit/miskin secara rutin.",
    contact: "Ibu Sosial - 0835-6789-0123",
    email: "sedekah@pondokrejo.desa.id",
    members: 47,
    logo: null,
    isActive: true
  },
  
  // 6. Komunitas Seni, Budaya & Tradisi
  {
    id: "23",
    name: "Karawitan Tradisional",
    slug: "karawitan-tradisional",
    category: "BUDAYA",
    description: "Melestarikan kesenian karawitan, jathilan, gejog lesung, reog mini, atau tari tradisional khas Yogyakarta.",
    contact: "Pak Seni - 0836-7890-1234",
    email: "karawitan@pondokrejo.desa.id",
    members: 32,
    logo: null,
    isActive: true
  },
  {
    id: "24",
    name: "Teater Rakyat",
    slug: "teater-rakyat",
    category: "BUDAYA",
    description: "Komunitas teater rakyat dan drama warga yang rutin pentas di acara-acara desa dan hari besar.",
    contact: "Rina Teater - 0837-8901-2345",
    email: "teater@pondokrejo.desa.id",
    members: 26,
    logo: null,
    isActive: true
  },
  {
    id: "25",
    name: "Musik Kampung",
    slug: "musik-kampung",
    category: "BUDAYA",
    description: "Komunitas musik dengan alat rebana, campursari, dan band akustik untuk mengembangkan bakat musik warga.",
    contact: "Ahmad Musik - 0838-9012-3456",
    email: "musik@pondokrejo.desa.id",
    members: 34,
    logo: null,
    isActive: true
  },
  {
    id: "26",
    name: "Batik & Kerajinan Lokal",
    slug: "batik-kerajinan-lokal",
    category: "BUDAYA",
    description: "Komunitas pengembangan batik dan kerajinan lokal dengan motif khas Sleman/Pondokrejo.",
    contact: "Ibu Batik - 0839-0123-4567",
    email: "batik@pondokrejo.desa.id",
    members: 29,
    logo: null,
    isActive: true
  },
  
  // 7. Komunitas Keluarga & Pemberdayaan
  {
    id: "27",
    name: "PAUD Swadaya",
    slug: "paud-swadaya",
    category: "KELUARGA",
    description: "Pos Pendidikan Anak Usia Dini yang dikelola oleh ibu-ibu kader untuk pendidikan early childhood.",
    contact: "Ibu Guru - 0841-2345-6789",
    email: "paud@pondokrejo.desa.id",
    members: 18,
    logo: null,
    isActive: true
  },
  {
    id: "28",
    name: "Parenting Warga",
    slug: "parenting-warga",
    category: "KELUARGA",
    description: "Komunitas diskusi tumbuh kembang anak dan pola asuh untuk orang tua di Kalurahan Pondokrejo.",
    contact: "Dokter Ani - 0842-3456-7890",
    email: "parenting@pondokrejo.desa.id",
    members: 35,
    logo: null,
    isActive: true
  },
  {
    id: "29",
    name: "PKK Aktif",
    slug: "pkk-aktif",
    category: "KELUARGA",
    description: "Kelompok PKK aktif dengan kegiatan pemanfaatan pekarangan dan diversifikasi pangan untuk keluarga sejahtera.",
    contact: "Ibu PKK - 0843-4567-8901",
    email: "pkk@pondokrejo.desa.id",
    members: 45,
    logo: null,
    isActive: true
  },
  {
    id: "30",
    name: "Lansia Bahagia",
    slug: "lansia-bahagia",
    category: "KELUARGA",
    description: "Komunitas lansia dengan kegiatan sosial & rekreasi untuk meningkatkan kualitas hidup para lansia.",
    contact: "Bapak Lansia - 0844-5678-9012",
    email: "lansia@pondokrejo.desa.id",
    members: 38,
    logo: null,
    isActive: true
  },
  
  // 8. Komunitas Pemuda & Inovasi
  {
    id: "31",
    name: "Karang Taruna Pondokrejo",
    slug: "karang-taruna-pondokrejo",
    category: "PEMUDA",
    description: "Organisasi kepemudaan resmi desa yang menjadi basis utama penggerak kegiatan pemuda dan kemasyarakatan.",
    contact: "Dwi Pratama - 0845-6789-0123",
    email: "karangtaruna@pondokrejo.desa.id",
    members: 52,
    logo: null,
    isActive: true
  },
  {
    id: "32",
    name: "Startup Desa",
    slug: "startup-desa",
    category: "INOVASI",
    description: "Komunitas inovasi warga muda dengan ide teknologi sederhana untuk pertanian, UMKM, atau pariwisata.",
    contact: "Rizki Startup - 0846-7890-1234",
    email: "startup@pondokrejo.desa.id",
    members: 22,
    logo: null,
    isActive: true
  },
  {
    id: "33",
    name: "Relawan Bencana Desa",
    slug: "relawan-bencana-desa",
    category: "PEMUDA",
    description: "Komunitas siaga bencana untuk penanggulangan banjir, gempa, kebakaran di tingkat desa.",
    contact: "Ahmad Relawan - 0847-8901-2345",
    email: "relawan@pondokrejo.desa.id",
    members: 31,
    logo: null,
    isActive: true
  },
  {
    id: "34",
    name: "Edukasi Anti Narkoba",
    slug: "edukasi-anti-narkoba",
    category: "PEMUDA",
    description: "Komunitas sosialisasi bahaya narkoba di sekolah & kalangan remaja untuk menciptakan generasi bersih.",
    contact: "Budi Anti Narkoba - 0848-9012-3456",
    email: "antinarkoba@pondokrejo.desa.id",
    members: 27,
    logo: null,
    isActive: true
  },
  
  // 9. Komunitas Khusus Tematik
  {
    id: "35",
    name: "Sepeda Ontel Antik",
    slug: "sepeda-ontel-antik",
    category: "LAINNYA",
    description: "Komunitas hobi sepeda ontel antik sekaligus edukasi sejarah transportasi tradisional.",
    contact: "Pak Ontel - 0849-0123-4567",
    email: "ontel@pondokrejo.desa.id",
    members: 19,
    logo: null,
    isActive: true
  },
  {
    id: "36",
    name: "Peternak Lele & Ayam Kampung",
    slug: "peternak-lele-ayam",
    category: "PERTANIAN",
    description: "Komunitas budidaya ternak lele dan ayam kampung skala rumahan untuk ketahanan pangan warga.",
    contact: "Pak Ternak - 0851-2345-6789",
    email: "ternak@pondokrejo.desa.id",
    members: 24,
    logo: null,
    isActive: true
  },
  {
    id: "37",
    name: "Wisata Kampung",
    slug: "wisata-kampung",
    category: "INOVASI",
    description: "Komunitas pengembangan homestay, kuliner lokal, dan wisata edukasi di Kalurahan Pondokrejo.",
    contact: "Rina Wisata - 0852-3456-7890",
    email: "wisata@pondokrejo.desa.id",
    members: 33,
    logo: null,
    isActive: true
  },
  {
    id: "38",
    name: "Bahasa Asing",
    slug: "bahasa-asing",
    category: "PENDIDIKAN",
    description: "Komunitas belajar bahasa Inggris dan Jepang untuk anak muda untuk meningkatkan wawasan global.",
    contact: "Maya Bahasa - 0853-4567-8901",
    email: "bahasa@pondokrejo.desa.id",
    members: 29,
    logo: null,
    isActive: true
  }
];

const categories = [
  { value: "ALL", label: "Semua Kategori" },
  { value: "PERTANIAN", label: "Pertanian & Lingkungan" },
  { value: "EKONOMI", label: "Ekonomi & UMKM" },
  { value: "DIGITAL", label: "Digital & Literasi" },
  { value: "OLAHRAGA", label: "Olahraga" },
  { value: "KESEHATAN", label: "Kesehatan" },
  { value: "RELIGI", label: "Keagamaan" },
  { value: "SOSIAL", label: "Sosial" },
  { value: "BUDAYA", label: "Seni & Budaya" },
  { value: "KELUARGA", label: "Keluarga & Pemberdayaan" },
  { value: "PEMUDA", label: "Pemuda & Inovasi" },
  { value: "PENDIDIKAN", label: "Pendidikan" },
  { value: "INOVASI", label: "Inovasi" },
  { value: "LINGKUNGAN", label: "Lingkungan" },
  { value: "LAINNYA", label: "Lainnya" }
];

const categoryColors = {
  PERTANIAN: "bg-green-100 text-green-800",
  EKONOMI: "bg-blue-100 text-blue-800",
  DIGITAL: "bg-indigo-100 text-indigo-800",
  OLAHRAGA: "bg-emerald-100 text-emerald-800",
  KESEHATAN: "bg-red-100 text-red-800",
  RELIGI: "bg-yellow-100 text-yellow-800",
  SOSIAL: "bg-orange-100 text-orange-800",
  BUDAYA: "bg-purple-100 text-purple-800",
  KELUARGA: "bg-pink-100 text-pink-800",
  PEMUDA: "bg-cyan-100 text-cyan-800",
  PENDIDIKAN: "bg-teal-100 text-teal-800",
  INOVASI: "bg-violet-100 text-violet-800",
  LINGKUNGAN: "bg-lime-100 text-lime-800",
  LAINNYA: "bg-gray-100 text-gray-800"
};

export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("name");

  const filteredCommunities = communities
    .filter(community => {
      const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           community.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || community.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "members":
          return b.members - a.members;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Komunitas Kalurahan Pondokrejo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan komunitas yang sesuai dengan minat dan bakat Anda. Bergabunglah untuk berkembang bersama.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari komunitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Urutkan berdasarkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nama (A-Z)</SelectItem>
                <SelectItem value="members">Jumlah Anggota</SelectItem>
                <SelectItem value="category">Kategori</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan {filteredCommunities.length} komunitas
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filter aktif</span>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{community.name}</CardTitle>
                    <Badge className={categoryColors[community.category as keyof typeof categoryColors]}>
                      {community.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm line-clamp-3">
                  {community.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {community.members} anggota aktif
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p><strong>Kontak:</strong> {community.contact}</p>
                    <p><strong>Email:</strong> {community.email}</p>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link href={`/komunitas/${community.slug}`}>
                      Lihat Detail Komunitas
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada komunitas ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter pencarian Anda untuk menemukan komunitas yang sesuai.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
                setSortBy("name");
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-accent/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Tidak menemukan komunitas yang sesuai?</h2>
          <p className="text-muted-foreground mb-6">
            Buat komunitas baru dan ajak warga lain untuk bergabung!
          </p>
          <Button asChild size="lg">
            <Link href="/daftar-komunitas">
              Daftarkan Komunitas Baru
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}