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
import { Plus, Edit, Trash2 } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string | null;
  communityId: string;
  community: { name: string };
  isActive: boolean;
}

interface Community {
  id: string;
  name: string;
}

export default function AdminActivitiesPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    communityId: "",
    isActive: true
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [activitiesRes, communitiesRes] = await Promise.all([
        fetch("/api/activities"),
        fetch("/api/communities")
      ]);
      const activitiesData = await activitiesRes.json();
      const communitiesData = await communitiesRes.json();
      setActivities(activitiesData);
      setCommunities(communitiesData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
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
      const payload = {
        ...formData,
        location: formData.location || null,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString()
      };

      if (editingActivity) {
        await fetch(`/api/activities/${editingActivity.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch("/api/activities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }
      setIsDialogOpen(false);
      setEditingActivity(null);
      setFormData({
        title: "",
        slug: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        communityId: "",
        isActive: true
      });
      fetchData();
    } catch (error) {
      console.error("Failed to save activity:", error);
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      slug: activity.slug,
      description: activity.description,
      startDate: new Date(activity.startDate).toISOString().split('T')[0],
      endDate: new Date(activity.endDate).toISOString().split('T')[0],
      location: activity.location || "",
      communityId: activity.communityId,
      isActive: activity.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
      try {
        await fetch(`/api/activities/${id}`, {
          method: "DELETE"
        });
        fetchData();
      } catch (error) {
        console.error("Failed to delete activity:", error);
      }
    }
  };

  const openNewDialog = () => {
    setEditingActivity(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      communityId: "",
      isActive: true
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
            <h1 className="text-xl font-bold">Admin - Kelola Kegiatan</h1>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Kegiatan</h2>
            <p className="text-muted-foreground">{activities.length} kegiatan</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kegiatan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingActivity ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}</DialogTitle>
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
                  <Label htmlFor="community">Komunitas</Label>
                  <Select value={formData.communityId} onValueChange={(value) => handleInputChange("communityId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih komunitas" />
                    </SelectTrigger>
                    <SelectContent>
                      {communities.map((community) => (
                        <SelectItem key={community.id} value={community.id}>
                          {community.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Tanggal Mulai</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Tanggal Selesai</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Lokasi</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange("isActive", e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isActive">Aktif</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">{editingActivity ? "Update" : "Simpan"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {activities.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada kegiatan. Klik "Tambah Kegiatan" untuk membuat kegiatan pertama.
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant={activity.isActive ? "default" : "secondary"}>
                            {activity.isActive ? "Aktif" : "Nonaktif"}
                          </Badge>
                          <Badge variant="outline">{activity.community.name}</Badge>
                        </div>
                        <h4 className="font-medium text-lg">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>{new Date(activity.startDate).toLocaleDateString('id-ID')}</span>
                          <span>→</span>
                          <span>{new Date(activity.endDate).toLocaleDateString('id-ID')}</span>
                          {activity.location && (
                            <span>📍 {activity.location}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(activity)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(activity.id)}>
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
