"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./VideoFeed";
import { IVideo } from "@/models/Video";
import { IProduct } from "@/models/Product";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Loader2, PlayCircle, Sparkles, Video, Image as ImageIcon } from "lucide-react";
import { IKImage } from "imagekitio-next";

export default function MainPage() {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFeed, setActiveFeed] = useState<"videos" | "photos">("videos");
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [videosRes, productsRes] = await Promise.all([
                    fetch("/api/videos"),
                    fetch("/api/products")
                ]);

                if (!videosRes.ok || !productsRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const videosData = await videosRes.json();
                const productsData = await productsRes.json();

                setVideos(videosData);
                setProducts(productsData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Could not load feed. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-lg font-medium animate-pulse">Curating your feed...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error shadow-lg max-w-2xl mx-auto mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
                <button onClick={() => window.location.reload()} className="btn btn-sm btn-ghost border-white">Retry</button>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-8 md:p-12">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                            <Sparkles className="w-4 h-4" />
                            <span>Trending Now</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                            Explore <span className="text-primary italic">Reels Pro</span>
                        </h1>
                        <p className="text-lg text-base-content/70 max-w-lg">
                            Experience the next generation of creative sharing. High quality videos and stunning product showcases.
                        </p>
                        {!session && (
                            <Link href="/register" className="btn btn-primary btn-lg rounded-full group">
                                Join the Community
                                <PlayCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                            </Link>
                        )}
                    </div>

                    <div className="hidden lg:block relative group">
                        <div className="w-64 h-96 rounded-2xl bg-base-300 shadow-2xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <div className="space-y-1">
                                    <div className="h-4 w-3/4 bg-white/20 rounded"></div>
                                    <div className="h-3 w-1/2 bg-white/10 rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-4 -left-4 w-64 h-96 rounded-2xl bg-primary/10 border border-primary/20 -rotate-6 -z-10"></div>
                    </div>
                </div>
            </section>

            {/* Content Hub Section */}
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="w-2 h-10 bg-primary rounded-full"></span>
                        Content Hub
                    </h2>

                    <div className="tabs tabs-boxed p-1 bg-base-200">
                        <button
                            className={`tab gap-2 rounded-lg transition-all ${activeFeed === 'videos' ? 'tab-active bg-primary text-primary-content shadow-md' : ''}`}
                            onClick={() => setActiveFeed("videos")}
                        >
                            <Video className="w-4 h-4" />
                            Videos
                        </button>
                        <button
                            className={`tab gap-2 rounded-lg transition-all ${activeFeed === 'photos' ? 'tab-active bg-primary text-primary-content shadow-md' : ''}`}
                            onClick={() => setActiveFeed("photos")}
                        >
                            <ImageIcon className="w-4 h-4" />
                            Photos
                        </button>
                    </div>
                </div>

                {activeFeed === "videos" ? (
                    videos.length > 0 ? (
                        <VideoFeed videos={videos} />
                    ) : (
                        <div className="text-center py-24 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
                            <div className="max-w-md mx-auto space-y-4">
                                <PlayCircle className="w-16 h-16 text-base-content/20 mx-auto" />
                                <h3 className="text-xl font-bold">No videos yet</h3>
                                <p className="text-base-content/60">Be the first to upload a video reel!</p>
                                <Link href="/upload" className="btn btn-primary">Upload Reel</Link>
                            </div>
                        </div>
                    )
                ) : (
                    products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product._id?.toString()} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-200 group">
                                    <figure className="relative h-64 overflow-hidden">
                                        <IKImage
                                            path={product.imageUrl}
                                            transformation={[{ height: "400", width: "400", crop: "at_max" }]}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        {product.price !== undefined && (
                                            <div className="absolute top-4 right-4 badge badge-primary p-3 font-bold shadow-lg">
                                                ${product.price}
                                            </div>
                                        )}
                                    </figure>
                                    <div className="card-body p-5">
                                        <h2 className="card-title text-xl mb-2">{product.name}</h2>
                                        <p className="text-base-content/70 line-clamp-2 text-sm mb-4">
                                            {product.description}
                                        </p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary btn-sm btn-outline rounded-full">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
                            <div className="max-w-md mx-auto space-y-4">
                                <ImageIcon className="w-16 h-16 text-base-content/20 mx-auto" />
                                <h3 className="text-xl font-bold">No photos yet</h3>
                                <p className="text-base-content/60">Share your product photos with the world!</p>
                                <Link href="/upload" className="btn btn-primary">Upload Photo</Link>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
