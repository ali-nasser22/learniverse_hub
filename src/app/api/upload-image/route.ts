import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload to Cloudflare Images
    const cloudflareFormData = new FormData();
    cloudflareFormData.append('file', file);

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: cloudflareFormData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    const imageUrl = `https://imagedelivery.net/${process.env.CLOUDFLARE_IMAGES_HASH}/${result.result.id}/public`;

    return NextResponse.json({ 
      success: true, 
      imageUrl,
      imageId: result.result.id 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}