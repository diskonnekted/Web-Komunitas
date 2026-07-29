"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, MapPin, Clock, Filter, Search } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string | null;
  community: { name: string };
  category: string;
  isActive: boolean;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    fetch("/api/activities")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredActivities = activities
    .filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || activity.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

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
          <h1 className="text-4xl font-bold mb-4">Kegiatan Komunitas</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Daftar kegiatan dan event dari seluruh komunitas Kalurahan Pondokrejo
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Kategori</SelectItem>
                <SelectItem value="PERTANIAN">Pertanian</SelectItem>
                <SelectItem value="EKONOMI">Ekonomi</SelectItem>
                <SelectItem value="DIGITAL">Digital</SelectItem>
                <SelectItem value="OLAHRAGA">Olahraga</SelectItem>
                <SelectItem value="KESEHATAN">Kesehatan</SelectItem>
                <SelectItem value="RELIGI">Religi</SelectItem>
                <SelectItem value="SOSIAL">Sosial</SelectItem>
                <SelectItem value="BUDAYA">Budaya</SelectItem>
                <SelectItem value="KELUARGA">Keluarga</SelectItem>
                <SelectItem value="PEMUDA">Pemuda</SelectItem>
                <SelectItem value="PENDIDIKAN">Pendidikan</SelectItem>
                <SelectItem value="INOVASI">Inovasi</SelectItem>
                <SelectItem value="LINGKUNGAN">Lingkungan</SelectItem>
                <SelectItem value="LAINNYA">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan {filteredActivities.length} kegiatan
          </p>
        </div>

        {/* Activities Grid */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </div>
                  <Badge variant={new Date(activity.startDate) > new Date() ? 'default' : 'secondary'}>
                    {new Date(activity.startDate) > new Date() ? 'Akan Datang' : 'Selesai'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    {new Date(activity.startDate).toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  {activity.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {activity.location}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {activity.community.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
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
