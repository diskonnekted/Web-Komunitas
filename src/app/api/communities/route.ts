import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const communities = await db.community.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(communities);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch communities' }, { status: 500 });
  }
}
