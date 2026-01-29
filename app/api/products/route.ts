import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectToDatabase();
        const products = await Product.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(products);
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectToDatabase();
        const body = await request.json();

        if (!body.name || !body.description || !body.imageUrl) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newProduct = await Product.create(body);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
