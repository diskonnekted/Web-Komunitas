"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Calendar, Users, MapPin, Play, Download, Share2, Heart } from "lucide-react";
import Image from "next/image";

// Mock data for development
const galleryItems = [
  {
    id: "1",
    title: "Festival UMKM Pondokrejo 2024",
    description: "Suksesnya Festival UMKM yang dihadiri ratusan pengunjung",
    fileUrl: "/api/placeholder/800/600",
    fileType: "image",
    community: "UMKM Pondokrejo",
    activity: "Festival UMKM Pondokrejo",
    date: "2024-02-15",
    location: "Balai Kalurahan",
    likes: 45,
    views: 234
  },
  {
    id: "2",
    title: "Turnamen Bola Voli",
    description: "Pertandingan seru turnamen bola voli antar RT",
    fileUrl: "/api/placeholder/800/600",
    fileType: "image",
    community: "Pemuda Olahraga",
    activity: "Turnamen Bola Voli Antar RT",
    date: "2024-02-20",
    location: "Lapangan Desa",
    likes: 38,
    views: 189
  },
  {
    id: "3",
    title: "Aksi Bersih-bersih Sungai",
    description: "Kegiatan membersihkan sungai bersama komunitas lingkungan",
    fileUrl: "/api/placeholder/800/600",
    fileType: "image",
    community: "Lingkungan Hijau",
    activity: "Pembersihan Sungai Code",
    date: "2024-02-25",
    location: "Sungai Code",
    likes: 52,
    views: 267
  },
  {
    id: "4",
    title: "Pelatihan Digital Marketing",
    description: "Sesi pelatihan digital marketing untuk UMKM",
    fileUrl: "/api/placeholder/800/600",
    fileType: "video",
    community: "UMKM Pondokrejo",
    activity: "Pelatihan Digital Marketing",
    date: "2024-01-20",
    location: "Ranggon Kalurahan",
    likes: 67,
    views: 445
  },
  {
    id: "5",
    title: "Pertunjukan Seni Tradisional",
    description: "Penampilan seni tradisional Jawa yang memukau",
    fileUrl: "/api/placeholder/800/600",
    fileType: "image",
    community: "Seni Budaya",
    activity: "Pertunjukan Seni Tradisional",
    date: "2024-03-01",
    location: "Balai Kalurahan",
    likes: 73,
    views: 356
  },
  {
    id: "6",
    title: "Workshop Teknologi Tepat Guna",
    description: "Demonstrasi alat pertanian modern",
    fileUrl: "/api/placeholder/800/600",
    fileType: "video",
    community: "Teknologi Tepat Guna",
    activity: "Workshop Teknologi Tepat Guna",
    date: "2024-03-05",
    location: "Balai Kalurahan",
    likes: 41,
    views: 198
  },
  {
    id: "7",
    title: "Pengajian Rutin",
    description: "Kegiatan pengajian rutin bulanan",
    fileUrl: "/api/placeholder/800/600",
    fileType: "image",
    community: "Pemuda Muslim",
    activity: "Pengajian Rutin",
    date: "2024-02-18",
    location: "Masjid Jami' Pondokrejo",
    likes: 29,
    views: 145
  },
  {
    id: "8",
    title: "Latihan Rutin Sepak Bola",
    description: "Sesi latihan sepak bola pemuda desa",
    fileUrl: "/api/placeholder/800/600",
    fileType: "video",
    community: "Pemuda Olahraga",
    activity: "Latihan Rutin Sepak Bola",
    date: "2024-01-15",
    location: "Lapangan Desa",
    likes: 35,
    views: 178
  }
];

const communities = [
  { value: "ALL", label: "Semua Komunitas" },
  { value: "UMKM Pondokrejo", label: "UMKM Pondokrejo" },
  { value: "Pemuda Olahraga", label: "Pemuda Olahraga" },
  { value: "Lingkungan Hijau", label: "Lingkungan Hijau" },
  { value: "Seni Budaya", label: "Seni Budaya" },
  { value: "Teknologi Tepat Guna", label: "Teknologi Tepat Guna" },
  { value: "Pemuda Muslim", label: "Pemuda Muslim" }
];

const fileTypes = [
  { value: "ALL", label: "Semua Media" },
  { value: "image", label: "Foto" },
  { value: "video", label: "Video" }
];

const categoryColors = {
  "UMKM Pondokrejo": "bg-blue-100 text-blue-800",
  "Pemuda Olahraga": "bg-green-100 text-green-800",
  "Lingkungan Hijau": "bg-emerald-100 text-emerald-800",
  "Seni Budaya": "bg-purple-100 text-purple-800",
  "Teknologi Tepat Guna": "bg-orange-100 text-orange-800",
  "Pemuda Muslim": "bg-yellow-100 text-yellow-800"
};

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("ALL");
  const [selectedFileType, setSelectedFileType] = useState("ALL");
  const [sortBy, setSortBy] = useState("date");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = galleryItems
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCommunity = selectedCommunity === "ALL" || item.community === selectedCommunity;
      const matchesFileType = selectedFileType === "ALL" || item.fileType === selectedFileType;
      return matchesSearch && matchesCommunity && matchesFileType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "likes":
          return b.likes - a.likes;
        case "views":
          return b.views - a.views;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const imageItems = filteredItems.filter(item => item.fileType === "image");
  const videoItems = filteredItems.filter(item => item.fileType === "video");

  const MediaCard = ({ item }: { item: typeof galleryItems[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative aspect-video bg-muted">
        {item.fileType === "image" ? (
          <Image
            src={item.fileUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={item.fileUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <Play className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/50 text-white">
            {item.fileType === "image" ? "Foto" : "Video"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <Badge className={categoryColors[item.community as keyof typeof categoryColors]}>
            {item.community}
          </Badge>
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              {item.likes}
            </div>
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {item.views}
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(item.date).toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Galeri Kegiatan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi foto dan video kegiatan komunitas di Kalurahan Pondokrejo
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari galeri..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih komunitas" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community) => (
                  <SelectItem key={community.value} value={community.value}>
                    {community.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFileType} onValueChange={setSelectedFileType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipe media" />
              </SelectTrigger>
              <SelectContent>
                {fileTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
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
                <SelectItem value="likes">Terpopuler</SelectItem>
                <SelectItem value="views">Terbanyak Dilihat</SelectItem>
                <SelectItem value="title">Judul (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan {filteredItems.length} media ({imageItems.length} foto, {videoItems.length} video)
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filter aktif</span>
          </div>
        </div>

        {/* Gallery Content */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua ({filteredItems.length})</TabsTrigger>
            <TabsTrigger value="photos">Foto ({imageItems.length})</TabsTrigger>
            <TabsTrigger value="videos">Video ({videoItems.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div onClick={() => setSelectedItem(item)}>
                      <MediaCard item={item} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        {item.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        {item.fileType === "image" ? (
                          <Image
                            src={item.fileUrl}
                            alt={item.title}
                            width={800}
                            height={600}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <Image
                              src={item.fileUrl}
                              alt={item.title}
                              width={800}
                              height={600}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="h-10 w-10 text-primary" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Komunitas</p>
                          <Badge className={categoryColors[item.community as keyof typeof categoryColors]}>
                            {item.community}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium">Kegiatan</p>
                          <p className="text-muted-foreground">{item.activity}</p>
                        </div>
                        <div>
                          <p className="font-medium">Tanggal</p>
                          <p className="text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Lokasi</p>
                          <p className="text-muted-foreground">{item.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {item.likes} suka
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views} dilihat
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
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
          </TabsContent>
          
          <TabsContent value="photos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {imageItems.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div onClick={() => setSelectedItem(item)}>
                      <MediaCard item={item} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        {item.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={item.fileUrl}
                          alt={item.title}
                          width={800}
                          height={600}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Komunitas</p>
                          <Badge className={categoryColors[item.community as keyof typeof categoryColors]}>
                            {item.community}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium">Kegiatan</p>
                          <p className="text-muted-foreground">{item.activity}</p>
                        </div>
                        <div>
                          <p className="font-medium">Tanggal</p>
                          <p className="text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Lokasi</p>
                          <p className="text-muted-foreground">{item.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {item.likes} suka
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views} dilihat
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
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
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videoItems.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div onClick={() => setSelectedItem(item)}>
                      <MediaCard item={item} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        {item.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.fileUrl}
                            alt={item.title}
                            width={800}
                            height={600}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="h-10 w-10 text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Komunitas</p>
                          <Badge className={categoryColors[item.community as keyof typeof categoryColors]}>
                            {item.community}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium">Kegiatan</p>
                          <p className="text-muted-foreground">{item.activity}</p>
                        </div>
                        <div>
                          <p className="font-medium">Tanggal</p>
                          <p className="text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Lokasi</p>
                          <p className="text-muted-foreground">{item.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {item.likes} suka
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views} dilihat
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
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
          </TabsContent>
        </Tabs>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada media ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter pencarian Anda untuk menemukan media yang sesuai.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCommunity("ALL");
                setSelectedFileType("ALL");
                setSortBy("date");
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Eye icon component
function Eye({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}