"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Calendar, Play, Download, Share2, Heart } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  fileUrl: string;
  fileType: string;
  createdAt: string;
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("ALL");
  const [sortBy, setSortBy] = useState("date");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        setGalleryItems(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch gallery:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredItems = galleryItems
    .filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFileType = selectedFileType === "ALL" || item.fileType.startsWith(selectedFileType === "image" ? "image" : "video");
      return matchesSearch && matchesFileType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        default:
          return 0;
      }
    });

  const imageItems = filteredItems.filter(item => item.fileType.startsWith("image"));
  const videoItems = filteredItems.filter(item => item.fileType.startsWith("video"));

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
          <h1 className="text-4xl font-bold mb-4">Galeri Kegiatan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi foto dan video kegiatan komunitas di Kalurahan Pondokrejo
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari galeri..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="ALL">Semua Media</option>
              <option value="image">Foto</option>
              <option value="video">Video</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="date">Terbaru</option>
              <option value="title">Judul (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan {filteredItems.length} media ({imageItems.length} foto, {videoItems.length} video)
          </p>
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
                      <DialogTitle>{item.title || "Tanpa Judul"}</DialogTitle>
                      <DialogDescription>{item.description || ""}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        {item.fileType.startsWith("image/") ? (
                          <Image
                            src={item.fileUrl}
                            alt={item.title || ""}
                            width={800}
                            height={600}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <Image
                              src={item.fileUrl}
                              alt={item.title || ""}
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
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
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
                      <DialogTitle>{item.title || "Tanpa Judul"}</DialogTitle>
                      <DialogDescription>{item.description || ""}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={item.fileUrl}
                          alt={item.title || ""}
                          width={800}
                          height={600}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
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
                      <DialogTitle>{item.title || "Tanpa Judul"}</DialogTitle>
                      <DialogDescription>{item.description || ""}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={item.fileUrl}
                          alt={item.title || ""}
                          width={800}
                          height={600}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
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
            <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Tidak ada media ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter pencarian Anda.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
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

function MediaCard({ item }: { item: GalleryItem }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative aspect-video bg-muted">
        {item.fileType.startsWith("image/") ? (
          <Image
            src={item.fileUrl}
            alt={item.title || ""}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Image
            src={item.fileUrl}
            alt={item.title || ""}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/50 text-white">
            {item.fileType.startsWith("image/") ? "Foto" : "Video"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-1">{item.title || "Tanpa Judul"}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {item.description || ""}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(item.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      </CardContent>
    </Card>
  );
}
