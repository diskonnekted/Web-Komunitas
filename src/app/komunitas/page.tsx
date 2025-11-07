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
  {
    id: "1",
    name: "UMKM Pondokrejo",
    slug: "umkm-pondokrejo",
    category: "UMKM",
    description: "Wadah bagi pelaku usaha mikro kecil menengah untuk berkembang bersama. Kami membantu dalam pemasaran, pelatihan, dan pengembangan produk UMKM lokal.",
    contact: "Budi Santoso - 0812-3456-7890",
    email: "umkm@pondokrejo.desa.id",
    members: 45,
    logo: null,
    isActive: true
  },
  {
    id: "2",
    name: "Pemuda Olahraga",
    slug: "pemuda-olahraga",
    category: "OLAHRAGA",
    description: "Mengembangkan bakat olahraga pemuda Kalurahan Pondokrejo melalui berbagai kegiatan dan turnamen rutin.",
    contact: "Ahmad Fauzi - 0813-4567-8901",
    email: "olahraga@pondokrejo.desa.id",
    members: 32,
    logo: null,
    isActive: true
  },
  {
    id: "3",
    name: "Seni Budaya",
    slug: "seni-budaya",
    category: "SENI",
    description: "Melestarikan seni dan budaya tradisional Kalurahan Pondokrejo. Fokus pada seni tari, musik, dan kerajinan lokal.",
    contact: "Siti Nurhaliza - 0814-5678-9012",
    email: "seni@pondokrejo.desa.id",
    members: 28,
    logo: null,
    isActive: true
  },
  {
    id: "4",
    name: "Lingkungan Hijau",
    slug: "lingkungan-hijau",
    category: "LINGKUNGAN",
    description: "Komunitas peduli lingkungan dan penghijauan desa. Melakukan aksi bersih-bersih, penanaman pohon, dan edukasi lingkungan.",
    contact: "Eko Green - 0815-6789-0123",
    email: "lingkungan@pondokrejo.desa.id",
    members: 38,
    logo: null,
    isActive: true
  },
  {
    id: "5",
    name: "Internet Marketing",
    slug: "internet-marketing",
    category: "INTERNET_MARKETING",
    description: "Komunitas belajar digital marketing dan pengembangan bisnis online. Membantu UMKM go digital.",
    contact: "Rizki Digital - 0816-7890-1234",
    email: "digital@pondokrejo.desa.id",
    members: 25,
    logo: null,
    isActive: true
  },
  {
    id: "6",
    name: "Teknologi Tepat Guna",
    slug: "teknologi-ttg",
    category: "TTG",
    description: "Mengembangkan dan menerapkan teknologi tepat guna untuk kemajuan pertanian dan industri rumahan.",
    contact: "Teguh Tekno - 0817-8901-2345",
    email: "ttg@pondokrejo.desa.id",
    members: 20,
    logo: null,
    isActive: true
  },
  {
    id: "7",
    name: "Pemuda Muslim",
    slug: "pemuda-muslim",
    category: "RELIGI",
    description: "Komunitas pemuda muslim untuk pengembangan spiritual dan sosial keagamaan di Kalurahan Pondokrejo.",
    contact: "Yusuf Islam - 0818-9012-3456",
    email: "muslim@pondokrejo.desa.id",
    members: 35,
    logo: null,
    isActive: true
  },
  {
    id: "8",
    name: "Karang Taruna",
    slug: "karang-taruna",
    category: "PEMUDA",
    description: "Organisasi kepemudaan resmi desa yang fokus pada pembinaan generasi muda dan kegiatan sosial.",
    contact: "Dwi Pratama - 0819-0123-4567",
    email: "karangtaruna@pondokrejo.desa.id",
    members: 42,
    logo: null,
    isActive: true
  }
];

const categories = [
  { value: "ALL", label: "Semua Kategori" },
  { value: "UMKM", label: "UMKM" },
  { value: "OLAHRAGA", label: "Olahraga" },
  { value: "SENI", label: "Seni Budaya" },
  { value: "LINGKUNGAN", label: "Lingkungan" },
  { value: "INTERNET_MARKETING", label: "Internet Marketing" },
  { value: "TTG", label: "Teknologi Tepat Guna" },
  { value: "RELIGI", label: "Keagamaan" },
  { value: "PEMUDA", label: "Pemuda" },
  { value: "WANITA", label: "Perempuan" },
  { value: "PENDIDIKAN", label: "Pendidikan" },
  { value: "KESEHATAN", label: "Kesehatan" },
  { value: "LAINNYA", label: "Lainnya" }
];

const categoryColors = {
  UMKM: "bg-blue-100 text-blue-800",
  OLAHRAGA: "bg-green-100 text-green-800",
  SENI: "bg-purple-100 text-purple-800",
  LINGKUNGAN: "bg-emerald-100 text-emerald-800",
  INTERNET_MARKETING: "bg-indigo-100 text-indigo-800",
  TTG: "bg-orange-100 text-orange-800",
  RELIGI: "bg-yellow-100 text-yellow-800",
  PEMUDA: "bg-red-100 text-red-800",
  WANITA: "bg-pink-100 text-pink-800",
  PENDIDIKAN: "bg-cyan-100 text-cyan-800",
  KESEHATAN: "bg-teal-100 text-teal-800",
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