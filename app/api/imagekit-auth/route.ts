import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Use existing environment variables from .env
// Note: NEXT_PUBLIC_ variables are used here because they are already defined in your .env file.
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!
});

export async function GET() {

    try {
        const authenticationParametes = imagekit.getAuthenticationParameters()
        return NextResponse.json(authenticationParametes);
    } catch (err) {
        return NextResponse.json(
            { error: "ImageKit Auth Failed" },
            { status: 500 }
        )
    }
}