import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, MapPin, Users, Mail, Phone, MessageSquare, Clock, Newspaper } from "lucide-react";
import Link from "next/link";

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

const newsCategoryColors: Record<string, string> = {
  pengumuman: "bg-blue-100 text-blue-800",
  kegiatan: "bg-green-100 text-green-800",
  program: "bg-purple-100 text-purple-800",
  pembangunan: "bg-orange-100 text-orange-800",
  pelatihan: "bg-cyan-100 text-cyan-800"
};

interface CommunityDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const { slug } = await params;
  
  let community;
  try {
    community = await db.community.findUnique({
      where: { slug },
      include: {
        members: true,
        activities: true,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }

  if (!community) {
    notFound();
  }

  const newsItems = await db.news.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    take: 10,
  });

  const members = community.members || [];
  const activities = community.activities || [];

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
                  {members.length} anggota aktif
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Bergabung sejak {new Date(community.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
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
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="news">
                  <Newspaper className="h-4 w-4 mr-1" />
                  Berita
                </TabsTrigger>
                <TabsTrigger value="about">Tentang</TabsTrigger>
                <TabsTrigger value="activities">Kegiatan</TabsTrigger>
                <TabsTrigger value="members">Anggota</TabsTrigger>
              </TabsList>
              
              <TabsContent value="news" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Newspaper className="h-5 w-5 mr-2" />
                    Berita Komunitas
                  </h3>
                  {newsItems.map((news) => (
                    <Card key={news.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{news.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Badge className={newsCategoryColors[news.category as keyof typeof newsCategoryColors]}>
                                {news.category}
                              </Badge>
                              <span className="text-xs">
                                {new Date(news.publishedAt).toLocaleDateString('id-ID', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </span>
                              <span className="text-xs">• {news.author}</span>
                            </CardDescription>
                          </div>
                          <Badge variant={news.isPublished ? 'default' : 'secondary'}>
                            {news.isPublished ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {news.excerpt && (
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {news.excerpt}
                          </p>
                        )}
                        <p className="text-sm line-clamp-3">
                          {news.content.substring(0, 200)}...
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <Link href={`/berita`}>Baca Selengkapnya →</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {newsItems.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Belum ada berita</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tentang Komunitas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {community.description}
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
                          <Badge variant={activity.startDate > new Date() ? 'default' : 'secondary'}>
                            {activity.startDate > new Date() ? 'Akan Datang' : 'Selesai'}
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
                  <Link href="/berita">
                    <Newspaper className="h-4 w-4 mr-2" />
                    Lihat Berita Lainnya
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
