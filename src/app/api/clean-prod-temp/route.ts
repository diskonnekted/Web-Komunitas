import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    console.log('--- STARTING PRODUCTION CLEAN AND SEED ---');
    
    // 1. Clear database tables
    await db.gallery.deleteMany({});
    await db.activity.deleteMany({});
    await db.communityMember.deleteMany({});
    await db.community.deleteMany({});
    await db.news.deleteMany({});
    await db.location.deleteMany({});
    await db.communityRequest.deleteMany({});

    // 2. Create Karang Taruna Community
    const community = await db.community.create({
      data: {
        name: 'Karang Taruna Pondokrejo',
        slug: 'karang-taruna',
        description: 'Organisasi kepemudaan resmi Kalurahan Pondokrejo yang menjadi wadah pengembangan diri, kegiatan sosial, olahraga, dan pemberdayaan pemuda di tingkat kalurahan.',
        category: 'PEMUDA',
        contact: 'Ketua Karang Taruna',
        address: 'Kalurahan Pondokrejo',
        logo: '/karangtaruna1.jpg',
        isActive: true,
      },
    });

    // 3. Create Activity
    const activity = await db.activity.create({
      data: {
        title: 'Rapat Koordinasi Karang Taruna Pondokrejo Persiapan Porkal Tahun 2025',
        slug: 'rapat-koordinasi-karang-taruna-pondokrejo-persiapan-porkal-tahun-2025',
        description: 'Kalurahan Pondokrejo Kamis, 19 Juni 2025 di Kalurahan Pondokrejo mengadakan koordinasi Karang Taruna untuk persiapan Porkal tahun 2025. Pada acara ini dihadiri oleh Lurah Kalurahan Pondokrejo, Kamitua, Ketua Karang Taruna beserta anggotanya. Dalam pertemuan ini membahas struktur kepengurusan Porkal dan membahas jenis lomba pada Porkal tahun ini.',
        startDate: new Date('2025-06-19T09:00:00Z'),
        endDate: new Date('2025-06-19T12:00:00Z'),
        location: 'Kalurahan Pondokrejo',
        address: 'Kalurahan Pondokrejo',
        communityId: community.id,
        isActive: true,
      },
    });

    // 4. Create Gallery entry
    await db.gallery.create({
      data: {
        title: 'Foto Kegiatan Rapat Koordinasi',
        description: 'Persiapan Porkal Tahun 2025',
        fileUrl: '/karangtaruna1.jpg',
        fileType: 'IMAGE',
        activityId: activity.id,
        communityId: community.id,
      },
    });

    // 5. Create News
    await db.news.create({
      data: {
        title: 'Rapat Koordinasi Karang Taruna Pondokrejo Persiapan Porkal Tahun 2025',
        slug: 'rapat-koordinasi-karang-taruna-pondokrejo-persiapan-porkal-tahun-2025',
        content: 'Kalurahan Pondokrejo Kamis, 19 Juni 2025 di Kalurahan Pondokrejo mengadakan koordinasi Karang Taruna untuk persiapan Porkal tahun 2025. Pada acara ini dihadiri oleh Lurah Kalurahan Pondokrejo, Kamitua, Ketua Karang Taruna beserta anggotanya. Dalam pertemuan ini membahas struktur kepengurusan Porkal dan membahas jenis lomba pada Porkal tahun ini.',
        excerpt: 'Koordinasi Karang Taruna Pondokrejo dalam persiapan Pekan Olahraga Kalurahan (Porkal) tahun 2025.',
        image: '/karangtaruna1.jpg',
        isPublished: true,
        publishedAt: new Date('2025-06-24T00:00:00Z'),
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Production database cleared and Karang Taruna seeded successfully!' 
    });
  } catch (error: any) {
    console.error('Error during production clean/seed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}
