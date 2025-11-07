"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Calendar, User, Eye, Share2, Clock, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data for development
const newsItems = [
  {
    id: "1",
    title: "Peluncuran Website Komunitas Kalurahan Pondokrejo",
    slug: "peluncuran-website-komunitas-kalurahan-pondokrejo",
    excerpt: "Dengan bangga kami persembahkan website resmi komunitas Kalurahan Pondokrejo sebagai wadah digital untuk seluruh warga.",
    content: `Dengan bangga kami persembahkan website resmi komunitas Kalurahan Pondokrejo sebagai wadah digital untuk seluruh warga. Website ini dibangun dengan tujuan untuk memudahkan koordinasi, informasi, dan kolaborasi antar komunitas yang ada di Kalurahan Pondokrejo.

Melalui website ini, diharapkan setiap komunitas dapat mempromosikan kegiatannya, warga dapat dengan mudah menemukan informasi tentang komunitas yang sesuai dengan minatnya, serta memfasilitasi komunikasi yang lebih efektif antar warga.

Fitur-fitur yang tersedia antara lain:
- Direktori komunitas lengkap
- Jadwal kegiatan terpadu
- Galeri foto dan video kegiatan
- Peta lokasi kegiatan
- Sistem pendaftaran komunitas baru
- Informasi berita dan pengumuman

Kami mengundang seluruh warga Kalurahan Pondokrejo untuk aktif berpartisipasi dalam pengembangan website ini demi kemajuan desa kita tercinta.`,
    image: "/api/placeholder/800/400",
    author: "Admin Kalurahan",
    publishedAt: "2024-01-15T10:00:00",
    isPublished: true,
    views: 1250,
    category: "pengumuman"
  },
  {
    id: "2",
    title: "Festival UMKM Pondokrejo 2024 Sukses Digelar",
    slug: "festival-umkm-pondokrejo-2024-sukses-digelar",
    excerpt: "Festival UMKM Pondokrejo 2024 berhasil menarik ratusan pengunjung dan mempromosikan produk lokal unggulan.",
    content: `Festival UMKM Pondokrejo 2024 yang diselenggarakan pada tanggal 15 Februari 2024 berhasil mencapai kesuksesan yang luar biasa. Acara yang berlangsung di Balai Kalurahan ini berhasil menarik lebih dari 500 pengunjung dari berbagai wilayah.

Festival ini menampilkan lebih dari 30 stand UMKM lokal yang memamerkan produk-produk unggulan seperti makanan tradisional, kerajinan tangan, produk pertanian, dan jasa layanan. Beberapa produk yang menjadi favorit pengunjung antara lain keripik singkong pedas, anyaman bambu, dan produk olahan susu kambing.

Kepala Desa Pondokrejo, Bapak Ahmad Wijaya, dalam sambutannya menyatakan kebanggaannya terhadap semangat kewirausahaan warga. "Festival ini bukan hanya ajang promosi, tetapi juga bukti bahwa UMKM di Pondokrejo memiliki potensi yang luar biasa untuk berkembang," ujarnya.

Acara juga dimeriahkan dengan berbagai hiburan seperti penampilan musik tradisional, demo memasak, dan seminar singkat tentang digital marketing untuk UMKM. Panitia berencana akan menjadikan festival ini sebagai acara tahunan untuk terus mendukung perkembangan UMKM lokal.`,
    image: "/api/placeholder/800/400",
    author: "Tim Humas",
    publishedAt: "2024-02-16T14:30:00",
    isPublished: true,
    views: 890,
    category: "kegiatan"
  },
  {
    id: "3",
    title: "Program Penghijauan Desa Tahun 2024",
    slug: "program-penghijauan-desa-tahun-2024",
    excerpt: "Kalurahan Pondokrejo meluncurkan program penghijauan dengan target menanam 1000 pohon dalam setahun.",
    content: `Dalam rangka mendukung pelestarian lingkungan dan mitigasi perubahan iklim, Kalurahan Pondokrejo secara resmi meluncurkan Program Penghijauan Desa Tahun 2024. Program ini memiliki target menanam 1000 pohon di berbagai lokasi strategis di seluruh wilayah desa.

Kepala Desa Ahmad Wijaya menjelaskan bahwa program ini merupakan bagian dari komitmen jangka panjang desa untuk menciptakan lingkungan yang lebih hijau dan sehat bagi generasi mendatang. "Kita tidak hanya menanam pohon, tetapi juga menanam harapan untuk masa depan yang lebih baik," ujarnya.

Jenis pohon yang akan ditanam antara lain pohon keras seperti jati, mahoni, dan trembesi untuk penghijauan jalan desa, serta pohon buah-buahan seperti mangga, rambutan, dan durian untuk pekarangan warga.

Program ini akan melibatkan seluruh elemen masyarakat termasuk komunitas Lingkungan Hijau, karang taruna, sekolah-sekolah, dan masyarakat umum. Setiap RT diwajibkan menyediakan lahan untuk penghijauan dan mengkoordinir warganya untuk berpartisipasi.

Selain penanaman pohon, program ini juga mencakup edukasi tentang pentingnya menjaga lingkungan, cara budidaya tanaman yang baik, serta pemeliharaan pohon yang telah ditanam. Diharapkan dengan program ini, kualitas udara di Pondokrejo dapat membaik dan lingkungan menjadi lebih asri.`,
    image: "/api/placeholder/800/400",
    author: "Dinas Lingkungan",
    publishedAt: "2024-01-20T09:00:00",
    isPublished: true,
    views: 654,
    category: "program"
  },
  {
    id: "4",
    title: "Pembangunan Lapangan Olahraga Baru",
    slug: "pembangunan-lapangan-olahraga-baru",
    excerpt: "Pembangunan lapangan olahraga multifungsi tahap pertama telah selesai dan siap digunakan.",
    content: `Setelah menunggu selama 6 bulan, pembangunan lapangan olahraga multifungsi tahap pertama di Kalurahan Pondokrejo akhirnya selesai. Lapangan yang terletak di dekat Balai Desa ini siap digunakan untuk berbagai kegiatan olahraga dan sosial.

Lapangan seluas 2000 meter persegi ini dilengkapi dengan fasilitas antara lain:
- Lapangan utama untuk sepak bola dan voli
- Track lari 100 meter
- Area pemanasan
- Toilet umum
- Area parkir
- Penerangan lampu untuk kegiatan malam

Ketua Komunitas Pemuda Olahraga, Bapak Budi Santoso, menyatakan rasa syukurnya atas selesainya pembangunan ini. "Ini adalah impian kami selama bertahun-tahun. Terima kasih kepada semua pihak yang telah mendukung pembangunan lapangan ini," ujarnya.

Pembangunan tahap pertama ini menghabiskan dana sebesar Rp 250 juta yang bersumber dari dana desa dan swadaya masyarakat. Untuk tahap kedua, direncanakan akan dibangun tribun penonton dan ruang ganti pemain.

Peresmian lapangan akan dilakukan pada bulan depan dengan menggelar turnamen sepak bola antar RT se-Kalurahan Pondokrejo. Komunitas Pemuda Olahraga juga telah menyusun jadwal rutin penggunaan lapangan untuk berbagai kegiatan olahraga.`,
    image: "/api/placeholder/800/400",
    author: "Tim Pembangunan",
    publishedAt: "2024-02-01T11:00:00",
    isPublished: true,
    views: 523,
    category: "pembangunan"
  },
  {
    id: "5",
    title: "Workshop Digital Marketing untuk UMKM",
    slug: "workshop-digital-marketing-untuk-umkm",
    excerpt: "Komunitas Internet Marketing mengadakan workshop gratis untuk membantu UMKM go digital.",
    content: `Komunitas Internet Marketing Kalurahan Pondokrejo kembali mengadakan workshop gratis dengan tema "Digital Marketing untuk UMKM" yang diikuti oleh 25 pelaku UMKM lokal. Workshop ini bertujuan untuk membantu para pelaku usaha mikro kecil menengah dalam memasarkan produk mereka secara online.

Workshop yang berlangsung selama 6 jam ini membahas berbagai topik penting antara lain:
- Pembuatan toko online sederhana
- Optimasi media sosial untuk bisnis
- Fotografi produk yang menarik
- Strategi content marketing
- Penggunaan marketplace lokal

Narasumber dalam workshop ini adalah Bapak Rizki Pratama, praktisi digital marketing yang telah berpengalaman lebih dari 10 tahun. Beliau membagikan tips dan trik praktis yang dapat langsung diterapkan oleh peserta.

Salah satu peserta, Ibu Siti Aminah yang memiliki usaha keripik singkong, menyatakan bahwa workshop ini sangat bermanfaat. "Sekarang saya jadi tahu cara memfoto produk yang bagus dan cara promosi di media sosial yang efektif," ujarnya.

Komunitas Internet Marketing berencana akan mengadakan workshop serupa secara rutin setiap 3 bulan sekali dengan topik yang berbeda-beda. Untuk informasi lebih lanjut, warga dapat menghubungi kontak yang tertera di website komunitas.`,
    image: "/api/placeholder/800/400",
    author: "Komunitas Internet Marketing",
    publishedAt: "2024-01-25T13:00:00",
    isPublished: true,
    views: 432,
    category: "pelatihan"
  }
];

const categories = [
  { value: "ALL", label: "Semua Kategori" },
  { value: "pengumuman", label: "Pengumuman" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "program", label: "Program" },
  { value: "pembangunan", label: "Pembangunan" },
  { value: "pelatihan", label: "Pelatihan" }
];

const categoryColors = {
  pengumuman: "bg-blue-100 text-blue-800",
  kegiatan: "bg-green-100 text-green-800",
  program: "bg-purple-100 text-purple-800",
  pembangunan: "bg-orange-100 text-orange-800",
  pelatihan: "bg-cyan-100 text-cyan-800"
};

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("date");
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  const filteredNews = newsItems
    .filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           news.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || news.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "views":
          return b.views - a.views;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const NewsCard = ({ news }: { news: typeof newsItems[0] }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge className={categoryColors[news.category as keyof typeof categoryColors]}>
            {news.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(news.publishedAt).toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            })}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Eye className="h-4 w-4 mr-1" />
            {news.views}
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {news.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {news.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            {news.author}
          </div>
          <Button variant="outline" size="sm">
            Baca Selengkapnya
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Berita & Pengumuman</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan, program, dan pengumuman dari Kalurahan Pondokrejo
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari berita..."
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
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Terbaru</SelectItem>
                <SelectItem value="views">Terpopuler</SelectItem>
                <SelectItem value="title">Judul (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan {filteredNews.length} berita
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filter aktif</span>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <Dialog key={news.id}>
              <DialogTrigger asChild>
                <div onClick={() => setSelectedNews(news)}>
                  <NewsCard news={news} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedNews?.title}</DialogTitle>
                  <DialogDescription>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {selectedNews?.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {selectedNews && new Date(selectedNews.publishedAt).toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {selectedNews?.views} dilihat
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {selectedNews?.image && (
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={selectedNews.image}
                        alt={selectedNews.title}
                        width={800}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-foreground">
                      {selectedNews?.content}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Badge className={categoryColors[selectedNews?.category as keyof typeof categoryColors]}>
                      {selectedNews?.category}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Bagikan
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter pencarian Anda untuk menemukan berita yang sesuai.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
                setSortBy("date");
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-accent/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Dapatkan Berita Terbaru</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Daftarkan email Anda untuk mendapatkan update berita dan pengumuman terkini dari Kalurahan Pondokrejo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Email Anda" className="flex-1" />
            <Button>Daftar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}