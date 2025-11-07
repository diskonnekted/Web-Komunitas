"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Filter, Phone, Clock, ExternalLink } from "lucide-react";

// Mock data for development
const locations = [
  {
    id: "1",
    name: "Balai Kalurahan Pondokrejo",
    address: "Jl. Kalurahan No. 1, Pondokrejo, Sleman, Yogyakarta",
    latitude: -7.7956,
    longitude: 110.3695,
    type: "balai",
    description: "Pusat administrasi dan kegiatan resmi Kalurahan Pondokrejo",
    phone: "(0274) 123456",
    openHours: "Senin-Jumat: 08:00-16:00",
    facilities: ["Rapat", "Pertemuan", "Acara Resmi", "Pelatihan"]
  },
  {
    id: "2",
    name: "Lapangan Olahraga Desa",
    address: "Jl. Olahraga No. 5, Pondokrejo, Sleman, Yogyakarta",
    latitude: -7.7960,
    longitude: 110.3700,
    type: "lapangan",
    description: "Lapangan multifungsi untuk berbagai kegiatan olahraga dan event",
    phone: "-",
    openHours: "Setiap Hari: 06:00-21:00",
    facilities: ["Sepak Bola", "Voli", "Bulutangkis", "Atletik", "Event"]
  },
  {
    id: "3",
    name: "Masjid Jami' Pondokrejo",
    address: "Jl. Masjid No. 10, Pondokrejo, Sleman, Yogyakarta",
    latitude: -7.7950,
    longitude: 110.3690,
    type: "masjid",
    description: "Masjid utama untuk kegiatan keagamaan warga",
    phone: "(0274) 123457",
    openHours: "Setiap Hari: 04:00-22:00",
    facilities: ["Sholat", "Pengajian", "TPA", "Kegiatan Religi"]
  },
  {
    id: "4",
    name: "Ranggon Kalurahan",
    address: "Jl. Gotong Royong No. 15, Pondokrejo, Sleman, Yogyakarta",
    latitude: -7.7965,
    longitude: 110.3710,
    type: "ranggon",
    description: "Tempat pertemuan dan kegiatan kemasyarakatan",
    phone: "(0274) 123458",
    openHours: "Senin-Sabtu: 09:00-17:00",
    facilities: ["Pertemuan", "Pelatihan", "Workshop", "Sosial"]
  },
  {
    id: "5",
    name: "Pos Kesehatan Desa",
    address: "Jl. Sehat No. 8, Pondokrejo, Sleman, Yogyakarta",
    latitude: -7.7958,
    longitude: 110.3705,
    type: "kesehatan",
    description: "Pusat pelayanan kesehatan dasar masyarakat",
    phone: "(0274) 123459",
    openHours: "Senin-Jumat: 08:00-16:00",
    facilities: ["Pemeriksaan", "Konsultasi", "Penyuluhan Kesehatan"]
  },
  {
    id: "6",
    name: "Sungai Code",
    address: "Batas Selatan Pondokrejo, Sleman, Yogyakarta",
    latitude: -7.7980,
    longitude: 110.3680,
    type: "sungai",
    description: "Sungai yang melintasi Kalurahan Pondokrejo",
    phone: "-",
    openHours: "24 Jam",
    facilities: ["Penghijauan", "Bersih-bersih", "Conservasi"]
  }
];

const upcomingEvents = [
  {
    id: "1",
    title: "Festival UMKM Pondokrejo",
    date: "2024-02-15",
    time: "09:00",
    location: "Balai Kalurahan Pondokrejo",
    community: "UMKM Pondokrejo"
  },
  {
    id: "2",
    title: "Turnamen Bola Voli Antar RT",
    date: "2024-02-20",
    time: "16:00",
    location: "Lapangan Olahraga Desa",
    community: "Pemuda Olahraga"
  },
  {
    id: "3",
    title: "Pembersihan Sungai Code",
    date: "2024-02-25",
    time: "07:00",
    location: "Sungai Code",
    community: "Lingkungan Hijau"
  },
  {
    id: "4",
    title: "Pengajian Rutin",
    date: "2024-02-18",
    time: "19:00",
    location: "Masjid Jami' Pondokrejo",
    community: "Pemuda Muslim"
  }
];

const locationTypes = [
  { value: "ALL", label: "Semua Lokasi" },
  { value: "balai", label: "Balai" },
  { value: "lapangan", label: "Lapangan" },
  { value: "masjid", label: "Masjid" },
  { value: "ranggon", label: "Ranggon" },
  { value: "kesehatan", label: "Kesehatan" },
  { value: "sungai", label: "Sungai" },
  { value: "lainnya", label: "Lainnya" }
];

const typeColors = {
  balai: "bg-blue-100 text-blue-800",
  lapangan: "bg-green-100 text-green-800",
  masjid: "bg-yellow-100 text-yellow-800",
  ranggon: "bg-purple-100 text-purple-800",
  kesehatan: "bg-red-100 text-red-800",
  sungai: "bg-cyan-100 text-cyan-800",
  lainnya: "bg-gray-100 text-gray-800"
};

const typeIcons = {
  balai: "🏛️",
  lapangan: "⚽",
  masjid: "🕌",
  ranggon: "🏘️",
  kesehatan: "🏥",
  sungai: "🌊",
  lainnya: "📍"
};

export default function LocationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "ALL" || location.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getEventsForLocation = (locationName: string) => {
    return upcomingEvents.filter(event => event.location === locationName);
  };

  const generateGoogleMapsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDcuMiJTIDExMMKwMjInMDguNCJF!5e0!3m2!1sen!2sid!4v1234567890!5m2!1sen!2sid`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Peta Lokasi</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan lokasi kegiatan dan fasilitas umum di Kalurahan Pondokrejo
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe lokasi" />
              </SelectTrigger>
              <SelectContent>
                {locationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan {filteredLocations.length} lokasi
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filter aktif</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Peta Lokasi
                </CardTitle>
                <CardDescription>
                  {selectedLocation.name} - {selectedLocation.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={generateGoogleMapsUrl(selectedLocation.latitude, selectedLocation.longitude)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Peta ${selectedLocation.name}`}
                  />
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={`https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buka di Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events at Selected Location */}
            <Card>
              <CardHeader>
                <CardTitle>Kegiatan di Lokasi Ini</CardTitle>
                <CardDescription>
                  Jadwal kegiatan yang akan datang di {selectedLocation.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getEventsForLocation(selectedLocation.name).map((event) => (
                    <div key={event.id} className="border-l-4 border-l-primary pl-4 py-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.community}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(event.date).toLocaleDateString('id-ID', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })} • {event.time}
                      </div>
                    </div>
                  ))}
                  {getEventsForLocation(selectedLocation.name).length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      Tidak ada kegiatan terjadwal di lokasi ini
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locations List */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Lokasi</CardTitle>
                <CardDescription>
                  Klik pada lokasi untuk melihat di peta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedLocation.id === location.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{typeIcons[location.type as keyof typeof typeIcons]}</span>
                          <h3 className="font-semibold">{location.name}</h3>
                        </div>
                        <Badge className={typeColors[location.type as keyof typeof typeColors]}>
                          {location.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {location.address}
                      </p>
                      <p className="text-sm mb-3">
                        {location.description}
                      </p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {location.phone !== "-" && (
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {location.phone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {location.openHours}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {location.facilities.slice(0, 3).map((facility, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {location.facilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{location.facilities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Type Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Legenda Lokasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(typeIcons).map(([type, icon]) => (
                    <div key={type} className="flex items-center space-x-2">
                      <span className="text-lg">{icon}</span>
                      <span className="text-sm capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tidak ada lokasi ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter pencarian Anda untuk menemukan lokasi yang sesuai.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedType("ALL");
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