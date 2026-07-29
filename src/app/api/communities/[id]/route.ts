import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, category, contact, email, phone, address, logo, isActive } = body;

    const community = await db.community.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        category,
        contact,
        email,
        phone,
        address,
        logo,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(community);
  } catch (error) {
    console.error('Failed to update community:', error);
    return NextResponse.json({ error: 'Failed to update community' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Delete the community
    await db.community.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Community deleted successfully' });
  } catch (error) {
    console.error('Failed to delete community:', error);
    return NextResponse.json({ error: 'Failed to delete community' }, { status: 500 });
  }
}
