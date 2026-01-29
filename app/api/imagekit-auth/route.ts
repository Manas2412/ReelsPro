import ImageKit from "imagekit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || "dummy",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "dummy",
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT || "dummy"
});

export async function GET() {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    } catch (err) {
        return NextResponse.json(
            { error: "ImageKit Auth Failed" },
            { status: 500 }
        );
    }
}