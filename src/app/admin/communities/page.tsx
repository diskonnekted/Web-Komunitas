"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  contact: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  logo: string | null;
  isActive: boolean;
  members: { id: string }[];
}

const categoryOptions = [
  "PERTANIAN", "EKONOMI", "DIGITAL", "OLAHRAGA", "KESEHATAN",
  "RELIGI", "SOSIAL", "BUDAYA", "KELUARGA", "PEMUDA",
  "PENDIDIKAN", "INOVASI", "LINGKUNGAN", "LAINNYA"
];

const categoryColors: Record<string, string> = {
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
  LAINNYA: "bg-gray-100 text-gray-800",
};

export default function AdminCommunitiesPage() {
  const router = useRouter();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const [formData, setFormData] = useState({
    name: "", slug: "", description: "", category: "",
    contact: "", email: "", phone: "", address: "", logo: "", isActive: true
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    fetchCommunities();
  }, [router]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch("/api/communities-full");
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error("Failed to fetch communities:", error);
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

  const handleEdit = (community: Community) => {
    setEditingCommunity(community);
    setFormData({
      name: community.name,
      slug: community.slug,
      description: community.description,
      category: community.category,
      contact: community.contact || "",
      email: community.email || "",
      phone: community.phone || "",
      address: community.address || "",
      logo: community.logo || "",
      isActive: community.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "name") {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommunity) return;
    try {
      await fetch(`/api/communities/${editingCommunity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsEditDialogOpen(false);
      setEditingCommunity(null);
      fetchCommunities();
    } catch (error) {
      console.error("Failed to update community:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus komunitas ini? Semua anggota dan kegiatan di dalamnya juga akan terhapus.")) {
      return;
    }
    try {
      const response = await fetch(`/api/communities/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCommunities();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Gagal menghapus komunitas.");
      }
    } catch (error) {
      console.error("Error deleting community:", error);
      alert("Terjadi kesalahan saat menghapus komunitas.");
    }
  };

  const toggleActive = async (community: Community) => {
    try {
      await fetch(`/api/communities/${community.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !community.isActive }),
      });
      fetchCommunities();
    } catch (error) {
      console.error("Failed to toggle active:", error);
    }
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
            <h1 className="text-xl font-bold">Admin - Kelola Komunitas</h1>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Komunitas</h2>
          <p className="text-muted-foreground">{communities.length} komunitas</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {communities.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada komunitas.
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {communities.map((community) => (
                  <div key={community.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={categoryColors[community.category as keyof typeof categoryColors]}>
                            {community.category}
                          </Badge>
                          <Badge variant={community.isActive ? "default" : "secondary"}>
                            {community.isActive ? "Aktif" : "Nonaktif"}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-lg">{community.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{community.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {community.members.length} anggota
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(community)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toggleActive(community)}>
                          <X className="h-4 w-4 mr-1" />
                          {community.isActive ? "Nonaktif" : "Aktif"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(community.id)}
                        >
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Komunitas</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nama</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={formData.slug} onChange={(e) => handleInputChange("slug", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={3} />
            </div>
            <div>
              <Label htmlFor="contact">Kontak</Label>
              <Input id="contact" value={formData.contact} onChange={(e) => handleInputChange("contact", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="phone">Telepon</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Alamat</Label>
              <Textarea id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} rows={2} />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => handleInputChange("isActive", e.target.checked)} className="h-4 w-4" />
              <Label htmlFor="isActive">Aktif</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Batal</Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
