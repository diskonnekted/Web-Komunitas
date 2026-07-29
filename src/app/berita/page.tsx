"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Calendar, User, Eye, Share2 } from "lucide-react";
import Image from "next/image";

const categories = [
  { value: "ALL", label: "Semua Kategori" },
  { value: "pengumuman", label: "Pengumuman" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "program", label: "Program" },
  { value: "pembangunan", label: "Pembangunan" },
  { value: "pelatihan", label: "Pelatihan" }
];

const categoryColors: Record<string, string> = {
  pengumuman: "bg-blue-100 text-blue-800",
  kegiatan: "bg-green-100 text-green-800",
  program: "bg-purple-100 text-purple-800",
  pembangunan: "bg-orange-100 text-orange-800",
  pelatihan: "bg-cyan-100 text-cyan-800"
};

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image: string | null;
  author: string;
  publishedAt: string;
  views: number;
  category: string;
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("date");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch("/api/news")
      .then(res => res.json())
      .then(data => setNewsItems(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredNews = newsItems
    .filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           news.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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
                <div className="cursor-pointer" onClick={() => setSelectedNews(news)}>
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    {news.image && (
                      <div className="relative aspect-video bg-muted overflow-hidden">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={categoryColors[news.category as keyof typeof categoryColors]}>
                          {news.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{news.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {news.excerpt || news.content.substring(0, 100)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(news.publishedAt).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {news.views}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Baca Selengkapnya
                      </Button>
                    </CardContent>
                  </Card>
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
