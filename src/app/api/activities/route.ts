import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const activities = await db.activity.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        community: true,
      },
    });
    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
