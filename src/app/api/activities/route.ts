import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, startDate, endDate, location, communityId, isActive } = body;

    const activity = await db.activity.create({
      data: {
        title,
        slug,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        communityId,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}
