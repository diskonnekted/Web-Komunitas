import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
