"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calendar,
  FileText,
  Image as ImageIcon,
  MapPin,
  AlertCircle,
  TrendingUp,
  LogOut,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Check,
  X as XIcon,
} from "lucide-react";

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  isActive: boolean;
  members: { id: string }[];
}

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

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image: string | null;
  author: string;
  category: string;
  views: number;
  isPublished: boolean;
  publishedAt: string;
}

interface CommunityRequest {
  id: string;
  name: string;
  description: string;
  category: string;
  contact: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  reason: string;
  status: string;
  createdAt: string;
}

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

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Real data state
  const [stats, setStats] = useState({
    totalCommunities: 0,
    activeCommunities: 0,
    totalActivities: 0,
    upcomingActivities: 0,
    totalNews: 0,
    totalGallery: 0,
    pendingRequests: 0,
  });

  const [communities, setCommunities] = useState<Community[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [requests, setRequests] = useState<CommunityRequest[]>([]);

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
      const [communitiesRes, activitiesRes, newsRes, requestsRes] = await Promise.all([
        fetch("/api/communities-full"),
        fetch("/api/activities"),
        fetch("/api/news"),
        fetch("/api/community-requests"),
      ]);

      const communitiesData: Community[] = await communitiesRes.json();
      const activitiesData: Activity[] = await activitiesRes.json();
      const newsData: NewsItem[] = await newsRes.json();
      const requestsData: CommunityRequest[] = await requestsRes.json();

      const now = new Date();

      setCommunities(communitiesData);
      setActivities(activitiesData);
      setNewsItems(newsData);
      setRequests(requestsData);

      setStats({
        totalCommunities: communitiesData.length,
        activeCommunities: communitiesData.filter((c) => c.isActive).length,
        totalActivities: activitiesData.length,
        upcomingActivities: activitiesData.filter(
          (a) => new Date(a.startDate) >= now && a.isActive
        ).length,
        totalNews: newsData.filter((n) => n.isPublished).length,
        totalGallery: 0,
        pendingRequests: requestsData.filter((r) => r.status === "PENDING").length,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/admin/login");
  };

  const handleDeleteCommunity = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus komunitas ini?")) return;
    try {
      await fetch(`/api/communities/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete community:", error);
    }
  };

  const handleApproveRequest = async (id: string) => {
    if (!confirm("Terima permintaan ini?")) return;
    try {
      await fetch(`/api/community-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED" }),
      });
      fetchData();
    } catch (error) {
      console.error("Failed to approve request:", error);
    }
  };

  const handleRejectRequest = async (id: string) => {
    if (!confirm("Tolak permintaan ini?")) return;
    try {
      await fetch(`/api/community-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      });
      fetchData();
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) return;
    try {
      await fetch(`/api/activities/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Admin Panel - Kalurahan Pondokrejo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" size="sm" onClick={() => router.push("/admin/dashboard")}>
                <Settings className="h-4 w-4 mr-2" />
                Pengaturan
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">
            Selamat datang di panel admin komunitas Kalurahan Pondokrejo
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Komunitas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCommunities}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeCommunities} aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kegiatan</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalActivities}</div>
              <p className="text-xs text-muted-foreground">
                {stats.upcomingActivities} akan datang
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Berita</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalNews}</div>
              <p className="text-xs text-muted-foreground">
                Artikel published
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Permintaan</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingRequests}</div>
              <p className="text-xs text-muted-foreground">
                Menunggu persetujuan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Top Section */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>
              Akses cepat ke fitur-fitur admin yang sering digunakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild className="h-20 flex-col">
                <Link href="/admin/communities">
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="text-sm">Kelola Komunitas</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/admin/activities">
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="text-sm">Tambah Kegiatan</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/admin/news">
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="text-sm">Tambah Berita</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/admin/gallery">
                  <ImageIcon className="h-6 w-6 mb-2" />
                  <span className="text-sm">Kelola Galeri</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6 mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="communities">Komunitas</TabsTrigger>
            <TabsTrigger value="requests">Permintaan</TabsTrigger>
            <TabsTrigger value="activities">Kegiatan</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kegiatan Terkini</CardTitle>
                <CardDescription>
                  Kegiatan yang baru-baru ini terjadi atau akan datang
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities
                    .filter((a) => new Date(a.startDate) >= new Date())
                    .slice(0, 5)
                    .map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.community.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.startDate).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <Badge variant="default">Akan Datang</Badge>
                      </div>
                    ))}
                  {activities.filter((a) => new Date(a.startDate) >= new Date()).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Tidak ada kegiatan akan datang
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Berita Terkini</CardTitle>
                <CardDescription>
                  Berita dan pengumuman terbaru
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsItems
                    .filter((n) => n.isPublished)
                    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                    .slice(0, 5)
                    .map((news) => (
                      <div key={news.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{news.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">{news.category}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(news.publishedAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                            <span className="text-xs text-muted-foreground">• {news.author}</span>
                          </div>
                          {news.excerpt && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{news.excerpt}</p>
                          )}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/berita`}>
                            <Eye className="h-4 w-4 mr-1" />
                            Lihat
                          </Link>
                        </Button>
                      </div>
                    ))}
                  {newsItems.filter((n) => n.isPublished).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Belum ada berita
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Komunitas</CardTitle>
                <CardDescription>
                  Kelola semua komunitas yang terdaftar di sistem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                          <h4 className="font-medium">{community.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {community.members.length} anggota
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/komunitas/${community.slug}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Lihat
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/communities`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteCommunity(community.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {communities.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Belum ada komunitas
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Permintaan Komunitas Baru</CardTitle>
                <CardDescription>
                  Permintaan pendaftaran komunitas yang menunggu persetujuan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{request.name}</h4>
                          <Badge variant="outline" className="mt-1">
                            {request.category}
                          </Badge>
                          <Badge variant={request.status === "PENDING" ? "default" : request.status === "APPROVED" ? "secondary" : "outline"} className="ml-2">
                            {request.status === "PENDING" ? "Menunggu" : request.status === "APPROVED" ? "Disetujui" : "Ditolak"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Kontak:</strong> {request.contact}
                      </p>
                      <p className="text-sm mb-3">{request.reason}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                          <Check className="h-4 w-4 mr-1" />
                          Terima
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleRejectRequest(request.id)}>
                          <XIcon className="h-4 w-4 mr-1" />
                          Tolak
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Detail
                        </Button>
                      </div>
                    </div>
                  ))}
                  {requests.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Belum ada permintaan
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Kegiatan</CardTitle>
                <CardDescription>
                  Kelola semua kegiatan dan event komunitas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Kegiatan Akan Datang</h4>
                    <Button asChild size="sm">
                      <Link href="/admin/activities">
                        <Plus className="h-4 w-4 mr-1" />
                        Tambah Kegiatan
                      </Link>
                    </Button>
                  </div>

                  {activities
                    .filter((a) => new Date(a.startDate) >= new Date())
                    .map((activity) => (
                      <div key={activity.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">{activity.community.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(activity.startDate).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/activities`}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteActivity(activity.id)}>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  {activities.filter((a) => new Date(a.startDate) >= new Date()).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Tidak ada kegiatan akan datang
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
