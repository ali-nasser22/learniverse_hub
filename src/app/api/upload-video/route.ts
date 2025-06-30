import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Cloudflare Stream
    const cloudflareFormData = new FormData();
    cloudflareFormData.append("file", file);

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: cloudflareFormData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      videoId: result.result.uid,
      playbackUrl: `https://iframe.videodelivery.net/${result.result.uid}`,
      thumbnailUrl: `https://videodelivery.net/${result.result.uid}/thumbnails/thumbnail.jpg`,
      duration: result.result.duration || 0,
    });
  } catch (error) {
    console.error("Video upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
