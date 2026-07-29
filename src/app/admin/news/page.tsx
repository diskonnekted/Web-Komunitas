"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, X, Image as ImageIcon } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image: string | null;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  category: string;
}

const categories = [
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

export default function AdminNewsPage() {
  const router = useRouter();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image: "",
    author: "Admin",
    category: "pengumuman",
    isPublished: false
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    fetchNews();
  }, [router]);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      setNewsItems(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "title") {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await fetch(`/api/news/${editingNews.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      }
      setIsDialogOpen(false);
      setEditingNews(null);
      setFormData({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        image: "",
        author: "Admin",
        category: "pengumuman",
        isPublished: false
      });
      fetchNews();
    } catch (error) {
      console.error("Failed to save news:", error);
    }
  };

  const handleEdit = (news: NewsItem) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      slug: news.slug,
      content: news.content,
      excerpt: news.excerpt || "",
      image: news.image || "",
      author: news.author,
      category: news.category,
      isPublished: news.isPublished
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        await fetch(`/api/news/${id}`, {
          method: "DELETE"
        });
        fetchNews();
      } catch (error) {
        console.error("Failed to delete news:", error);
      }
    }
  };

  const openNewDialog = () => {
    setEditingNews(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      image: "",
      author: "Admin",
      category: "pengumuman",
      isPublished: false
    });
    setIsDialogOpen(true);
  };

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
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Admin - Kelola Berita</h1>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Berita</h2>
            <p className="text-muted-foreground">{newsItems.length} berita</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Berita
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingNews ? "Edit Berita" : "Tambah Berita Baru"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image">URL Gambar</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Ringkasan</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Konten</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    rows={8}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author">Penulis</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => handleInputChange("isPublished", e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isPublished">Publish Sekarang</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">{editingNews ? "Update" : "Simpan"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {newsItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada berita. Klik "Tambah Berita" untuk membuat berita pertama.
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {newsItems.map((news) => (
                  <div key={news.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={categoryColors[news.category as keyof typeof categoryColors]}>
                            {news.category}
                          </Badge>
                          <Badge variant={news.isPublished ? "default" : "secondary"}>
                            {news.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-lg">{news.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {news.excerpt || news.content.substring(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>{news.author}</span>
                          <span>{new Date(news.publishedAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(news)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(news.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
