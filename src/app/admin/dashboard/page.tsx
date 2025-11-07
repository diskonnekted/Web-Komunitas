"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Trash2
} from "lucide-react";

// Mock data for dashboard
const dashboardStats = {
  totalCommunities: 8,
  activeCommunities: 8,
  totalActivities: 15,
  upcomingActivities: 6,
  totalNews: 5,
  totalGallery: 8,
  pendingRequests: 3
};

const recentActivities = [
  {
    id: 1,
    title: "Festival UMKM Pondokrejo",
    date: "2024-02-15",
    community: "UMKM Pondokrejo",
    status: "completed"
  },
  {
    id: 2,
    title: "Turnamen Bola Voli",
    date: "2024-02-20",
    community: "Pemuda Olahraga",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Pembersihan Sungai Code",
    date: "2024-02-25",
    community: "Lingkungan Hijau",
    status: "upcoming"
  }
];

const pendingRequests = [
  {
    id: 1,
    name: "Komunitas Petani Muda",
    category: "PERTANIAN",
    contact: "Budi Santoso",
    submittedAt: "2024-02-10",
    reason: "Membantu petani muda dalam pengembangan pertanian modern"
  },
  {
    id: 2,
    name: "Komunitas Kesenian Jawa",
    category: "SENI",
    contact: "Siti Nurhaliza",
    submittedAt: "2024-02-12",
    reason: "Melestarikan kesenian tradisional Jawa di kalangan generasi muda"
  },
  {
    id: 3,
    name: "Komunitas Kesehatan Holistik",
    category: "KESEHATAN",
    contact: "Dr. Ahmad",
    submittedAt: "2024-02-14",
    reason: "Promosi kesehatan holistik dan pengobatan tradisional"
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/admin/login");
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
              <Button variant="secondary" size="sm">
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
              <div className="text-2xl font-bold">{dashboardStats.totalCommunities}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.activeCommunities} aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kegiatan</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalActivities}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.upcomingActivities} akan datang
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Berita</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalNews}</div>
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
              <div className="text-2xl font-bold">{dashboardStats.pendingRequests}</div>
              <p className="text-xs text-muted-foreground">
                Menunggu persetujuan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="communities">Komunitas</TabsTrigger>
            <TabsTrigger value="requests">Permintaan</TabsTrigger>
            <TabsTrigger value="activities">Kegiatan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Kegiatan Terkini</CardTitle>
                <CardDescription>
                  Kegiatan yang baru-baru ini terjadi atau akan datang
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.community}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <Badge variant={activity.status === 'completed' ? 'secondary' : 'default'}>
                        {activity.status === 'completed' ? 'Selesai' : 'Akan Datang'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>
                  Akses cepat ke fitur-fitur admin yang sering digunakan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    <span className="text-sm">Tambah Komunitas</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    <span className="text-sm">Tambah Kegiatan</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    <span className="text-sm">Tambah Berita</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <ImageIcon className="h-6 w-6 mb-2" />
                    <span className="text-sm">Upload Media</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                  {/* Sample communities list */}
                  <div className="border rounded-lg">
                    <div className="p-4 border-b bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">UMKM Pondokrejo</h4>
                          <p className="text-sm text-muted-foreground">45 anggota • Aktif</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Lihat
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Pemuda Olahraga</h4>
                          <p className="text-sm text-muted-foreground">32 anggota • Aktif</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Lihat
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{request.name}</h4>
                          <Badge variant="outline" className="mt-1">
                            {request.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(request.submittedAt).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Kontak:</strong> {request.contact}
                      </p>
                      <p className="text-sm mb-3">{request.reason}</p>
                      <div className="flex space-x-2">
                        <Button size="sm">Terima</Button>
                        <Button variant="outline" size="sm">Tolak</Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Detail
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Kegiatan
                    </Button>
                  </div>
                  
                  {recentActivities
                    .filter(activity => activity.status === 'upcoming')
                    .map((activity) => (
                      <div key={activity.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">{activity.community}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString('id-ID', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}