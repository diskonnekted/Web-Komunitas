import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, MapPin, Users, Mail, Phone, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";

// Mock data for development
const communities = {
  "umkm-pondokrejo": {
    id: "1",
    name: "UMKM Pondokrejo",
    slug: "umkm-pondokrejo",
    category: "UMKM",
    description: "Wadah bagi pelaku usaha mikro kecil menengah untuk berkembang bersama. Kami membantu dalam pemasaran, pelatihan, dan pengembangan produk UMKM lokal.",
    fullDescription: "UMKM Pondokrejo adalah komunitas yang berdedikasi untuk mengembangkan usaha mikro kecil menengah di Kalurahan Pondokrejo. Kami menyediakan berbagai program pelatihan, bimbingan teknis, dan kesempatan pemasaran bagi anggota kami. Dengan semangat gotong royong, kami percaya bahwa setiap UMKM memiliki potensi untuk berkembang dan bersaing di pasar yang lebih luas.",
    contact: "Budi Santoso",
    phone: "0812-3456-7890",
    email: "umkm@pondokrejo.desa.id",
    address: "Balai Kalurahan Pondokrejo, Sleman, Yogyakarta",
    members: 45,
    logo: null,
    isActive: true,
    established: "2020-03-15"
  },
  "pemuda-olahraga": {
    id: "2",
    name: "Pemuda Olahraga",
    slug: "pemuda-olahraga",
    category: "OLAHRAGA",
    description: "Mengembangkan bakat olahraga pemuda Kalurahan Pondokrejo melalui berbagai kegiatan dan turnamen rutin.",
    fullDescription: "Komunitas Pemuda Olahraga berfokus pada pengembangan bakat olahraga di kalangan pemuda Kalurahan Pondokrejo. Kami menyelenggarakan berbagai kegiatan olahraga rutin, turnamen antar RT, dan pelatihan untuk meningkatkan kualitas atlet lokal. Olahraga yang kami kembangkan antara lain sepak bola, voli, bulu tangkis, dan atletik.",
    contact: "Ahmad Fauzi",
    phone: "0813-4567-8901",
    email: "olahraga@pondokrejo.desa.id",
    address: "Lapangan Olahraga Kalurahan Pondokrejo",
    members: 32,
    logo: null,
    isActive: true,
    established: "2019-07-20"
  }
};

const communityMembers = {
  "umkm-pondokrejo": [
    { id: "1", name: "Budi Santoso", position: "Ketua", email: "budi@umkm.com", phone: "0812-3456-7890", joinDate: "2020-03-15" },
    { id: "2", name: "Siti Aminah", position: "Sekretaris", email: "siti@umkm.com", phone: "0812-3456-7891", joinDate: "2020-03-15" },
    { id: "3", name: "Ahmad Dahlan", position: "Bendahara", email: "ahmad@umkm.com", phone: "0812-3456-7892", joinDate: "2020-04-01" },
    { id: "4", name: "Dewi Lestari", position: "Anggota", email: "dewi@umkm.com", phone: "0812-3456-7893", joinDate: "2020-05-15" },
    { id: "5", name: "Eko Prasetyo", position: "Anggota", email: "eko@umkm.com", phone: "0812-3456-7894", joinDate: "2020-06-20" }
  ],
  "pemuda-olahraga": [
    { id: "1", name: "Ahmad Fauzi", position: "Ketua", email: "ahmad@olahraga.com", phone: "0813-4567-8901", joinDate: "2019-07-20" },
    { id: "2", name: "Budi Santoso", position: "Wakil Ketua", email: "budi@olahraga.com", phone: "0813-4567-8902", joinDate: "2019-07-20" },
    { id: "3", name: "Citra Dewi", position: "Sekretaris", email: "citra@olahraga.com", phone: "0813-4567-8903", joinDate: "2019-08-01" },
    { id: "4", name: "Dedi Kurniawan", position: "Bendahara", email: "dedi@olahraga.com", phone: "0813-4567-8904", joinDate: "2019-08-15" }
  ]
};

const communityActivities = {
  "umkm-pondokrejo": [
    {
      id: "1",
      title: "Festival UMKM Pondokrejo 2024",
      description: "Pameran dan penjualan produk UMKM unggulan Kalurahan Pondokrejo",
      date: "2024-02-15",
      time: "09:00",
      location: "Balai Kalurahan",
      status: "upcoming"
    },
    {
      id: "2",
      title: "Pelatihan Digital Marketing",
      description: "Pelatihan pemasaran online untuk UMKM",
      date: "2024-01-20",
      time: "13:00",
      location: "Ranggon Kalurahan",
      status: "completed"
    },
    {
      id: "3",
      title: "Workshop Kemasan Produk",
      description: "Desain kemasan yang menarik untuk produk UMKM",
      date: "2024-03-10",
      time: "09:00",
      location: "Balai Kalurahan",
      status: "upcoming"
    }
  ],
  "pemuda-olahraga": [
    {
      id: "1",
      title: "Turnamen Bola Voli Antar RT",
      description: "Turnamen bola voli antar RT se-Kalurahan Pondokrejo",
      date: "2024-02-20",
      time: "16:00",
      location: "Lapangan Desa",
      status: "upcoming"
    },
    {
      id: "2",
      title: "Latihan Rutin Sepak Bola",
      description: "Latihan sepak bola setiap minggu",
      date: "2024-01-15",
      time: "16:00",
      location: "Lapangan Desa",
      status: "completed"
    },
    {
      id: "3",
      title: "Lari Pagi Bersama",
      description: "Olahraga lari pagi untuk kesehatan",
      date: "2024-02-25",
      time: "06:00",
      location: "Alun-alun Desa",
      status: "upcoming"
    }
  ]
};

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

interface CommunityDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const community = communities[params.slug as keyof typeof communities];
  const members = communityMembers[params.slug as keyof typeof communityMembers] || [];
  const activities = communityActivities[params.slug as keyof typeof communityActivities] || [];

  if (!community) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 bg-accent text-primary">
                  <AvatarFallback className="text-2xl font-bold">
                    {community.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
                  <Badge className={categoryColors[community.category as keyof typeof categoryColors]}>
                    {community.category}
                  </Badge>
                </div>
              </div>
              <p className="text-lg opacity-90 mb-4 max-w-2xl">
                {community.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {community.members} anggota aktif
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Berdiri sejak {new Date(community.established).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild variant="secondary" className="bg-accent text-primary hover:bg-accent/90">
                <Link href="/daftar-komunitas">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Bergabung dengan Komunitas
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">Tentang</TabsTrigger>
                <TabsTrigger value="activities">Kegiatan</TabsTrigger>
                <TabsTrigger value="members">Anggota</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tentang Komunitas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {community.fullDescription}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Kegiatan Komunitas</h3>
                  {activities.map((activity) => (
                    <Card key={activity.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{activity.title}</CardTitle>
                            <CardDescription>{activity.description}</CardDescription>
                          </div>
                          <Badge variant={activity.status === 'upcoming' ? 'default' : 'secondary'}>
                            {activity.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-2" />
                            {new Date(activity.date).toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })} pukul {activity.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {activity.location}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="members" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Anggota Komunitas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map((member) => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {member.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold">{member.name}</h4>
                              <p className="text-sm text-muted-foreground">{member.position}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                Bergabung {new Date(member.joinDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{community.contact}</p>
                    <p className="text-sm text-muted-foreground">Kontak Person</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{community.phone}</p>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{community.email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{community.address}</p>
                    <p className="text-sm text-muted-foreground">Alamat</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/daftar-komunitas">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Bergabung dengan Komunitas
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/kegiatan">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Lihat Kegiatan Lainnya
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/komunitas">
                    <Users className="h-4 w-4 mr-2" />
                    Jelajahi Komunitas Lain
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}