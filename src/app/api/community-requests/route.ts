import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const requests = await db.communityRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, contact, email, phone, address, reason } = body;

    const request_data = await db.communityRequest.create({
      data: {
        name,
        description,
        category,
        contact,
        email,
        phone,
        address,
        reason,
        status: 'PENDING',
      },
    });

    return NextResponse.json(request_data, { status: 201 });
  } catch (error) {
    console.error('Failed to create request:', error);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}
