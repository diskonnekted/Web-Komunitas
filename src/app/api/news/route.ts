import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const news = await db.news.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, image, author, category, views, isPublished, publishedAt } = body;

    const news = await db.news.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        image: image || null,
        author: author || 'Admin',
        category: category || 'pengumuman',
        views: views || 0,
        isPublished: isPublished !== undefined ? isPublished : false,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
