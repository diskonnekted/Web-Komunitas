import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, name, description, category, contact, email, phone, address, reason } = body;

    const request_data = await db.communityRequest.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(name && { name }),
        ...(description && { description }),
        ...(category && { category }),
        ...(contact && { contact }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(reason && { reason }),
      },
    });

    return NextResponse.json(request_data);
  } catch (error) {
    console.error('Failed to update request:', error);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.communityRequest.delete({ where: { id } });
    return NextResponse.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Failed to delete request:', error);
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 });
  }
}
