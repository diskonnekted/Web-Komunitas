"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, MapPin, Clock, Filter, Search, Users } from "lucide-react";

// Mock data for development
const activities = [
  {
    id: "1",
    title: "Festival UMKM Pondokrejo",
    description: "Pameran dan penjualan produk UMKM unggulan Kalurahan Pondokrejo",
    date: "2024-02-15",
    time: "09:00",
    endDate: "2024-02-15",
    endTime: "17:00",
    location: "Balai Kalurahan",
    community: "UMKM Pondokrejo",
    category: "UMKM",
    status: "upcoming",
    latitude: -7.7956,
    longitude: 110.3695
  },
  {
    id: "2",
    title: "Turnamen Bola Voli Antar RT",
    description: "Turnamen bola voli antar RT se-Kalurahan Pondokrejo",
    date: "2024-02-20",
    time: "16:00",
    endDate: "2024-02-20",
    endTime: "20:00",
    location: "Lapangan Desa",
    community: "Pemuda Olahraga",
    category: "OLAHRAGA",
    status: "upcoming",
    latitude: -7.7956,
    longitude: 110.3695
  },
  {
    id: "3",
    title: "Pembersihan Sungai Code",
    description: "Aksi bersih-bersih sungai dan penanaman pohon di bantaran sungai",
    date: "2024-02-25",
    time: "07:00",
    endDate: "2024-02-25",
    endTime: "11:00",
    location: "Sungai Code",
    community: "Lingkungan Hijau",
    category: "LINGKUNGAN",
    status: "upcoming",
    latitude: -7.7956,
    longitude: 110.3695
  },
  {
    id: "4",
    title: "Pelatihan Digital Marketing",
    description: "Pelatihan pemasaran online untuk UMKM",
    date: "2024-01-20",
    time: "13:00",
    endDate: "2024-01-20",
    endTime: "16:00",
    location: "Ranggon Kalurahan",
    community: "UMKM Pondokrejo",
    category: "UMKM",
    status: "completed",
    latitude: -7.7956,
    longitude: 110.3695
  },
  {
    id: "5",
    title: "Pertunjukan Seni Tradisional",
    description: "Pertunjukan seni tradisional Jawa dan kesenian lokal",
    date: "2024-03-01",
    time: "19:00",
    endDate: "2024-03-01",
    endTime: "22:00",
    location: "Balai Kalurahan",
    community: "Seni Budaya",
    category: "SENI",
    status: "upcoming",
    latitude: -7.7956,
    longitude: 110.3695
  },
  {
    id: "6",
    title: "Workshop Teknologi Tepat Guna",
    description: "Pelatihan penerapan teknologi tepat guna untuk pertanian",
    date: "2024-03-05",
    time: "09:00",
    endDate: "2024-03-05",
    endTime: "15:00",
    location: "Balai Kalurahan",
    community: "Teknologi Tepat Guna",
    category: "TTG",
    status: "upcoming",
    latitude: -7.7956,
    longitude: 110.3695
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

export default function ActivitiesPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState("list");

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.community.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const upcomingActivities = filteredActivities.filter(activity => activity.status === "upcoming");
  const completedActivities = filteredActivities.filter(activity => activity.status === "completed");

  const getActivitiesForDate = (date: Date) => {
    return filteredActivities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate.toDateString() === date.toDateString();
    });
  };

  const hasActivityForDate = (date: Date) => {
    return getActivitiesForDate(date).length > 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Kegiatan Komunitas</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jadwal lengkap kegiatan dan event dari berbagai komunitas di Kalurahan Pondokrejo
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari kegiatan..."
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

            <div className="flex gap-2">
              <Button 
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="flex-1"
              >
                Daftar
              </Button>
              <Button 
                variant={viewMode === "calendar" ? "default" : "outline"}
                onClick={() => setViewMode("calendar")}
                className="flex-1"
              >
                Kalender
              </Button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan {filteredActivities.length} kegiatan
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filter aktif</span>
          </div>
        </div>

        {/* Content */}
        {viewMode === "calendar" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Kalender Kegiatan</CardTitle>
                <CardDescription>Klik pada tanggal untuk melihat kegiatan</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    hasActivity: (date) => hasActivityForDate(date)
                  }}
                  modifiersStyles={{
                    hasActivity: {
                      backgroundColor: "#2E7D32",
                      color: "white",
                      fontWeight: "bold"
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Activities for Selected Date */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? `Kegiatan pada ${selectedDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : 'Pilih Tanggal'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-4">
                    {getActivitiesForDate(selectedDate).map((activity) => (
                      <Card key={activity.id} className="border-l-4 border-l-primary">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{activity.title}</CardTitle>
                              <CardDescription className="text-sm">
                                {activity.community}
                              </CardDescription>
                            </div>
                            <Badge className={categoryColors[activity.category as keyof typeof categoryColors]}>
                              {activity.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            {activity.description}
                          </p>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {activity.time} - {activity.endTime}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {activity.location}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {getActivitiesForDate(selectedDate).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Tidak ada kegiatan pada tanggal ini
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Silakan pilih tanggal untuk melihat kegiatan
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Akan Datang ({upcomingActivities.length})</TabsTrigger>
              <TabsTrigger value="completed">Selesai ({completedActivities.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingActivities.map((activity) => (
                  <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                        <Badge className={categoryColors[activity.category as keyof typeof categoryColors]}>
                          {activity.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {activity.community}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {activity.description}
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          {new Date(activity.date).toLocaleDateString('id-ID', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {activity.time} - {activity.endTime}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {activity.location}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Akan Datang
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {upcomingActivities.length === 0 && (
                <div className="text-center py-12">
                  <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Tidak ada kegiatan yang akan datang</h3>
                  <p className="text-muted-foreground">
                    Tidak ada kegiatan terjadwal dalam waktu dekat.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedActivities.map((activity) => (
                  <Card key={activity.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                        <Badge className={categoryColors[activity.category as keyof typeof categoryColors]}>
                          {activity.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {activity.community}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {activity.description}
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          {new Date(activity.date).toLocaleDateString('id-ID', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {activity.time} - {activity.endTime}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {activity.location}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge variant="secondary">
                          Selesai
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {completedActivities.length === 0 && (
                <div className="text-center py-12">
                  <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Belum ada kegiatan yang selesai</h3>
                  <p className="text-muted-foreground">
                    Kegiatan yang telah selesai akan ditampilkan di sini.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* No Results */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada kegiatan ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter pencarian Anda untuk menemukan kegiatan yang sesuai.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
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