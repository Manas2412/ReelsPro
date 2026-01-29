"use client";

import { useState } from "react";
import VideoUploadForm from "../components/VideoUploadForm";
import PhotoUploadForm from "../components/PhotoUploadForm";
import { Video, Image as ImageIcon } from "lucide-react";

export default function VideoUploadPage() {
  const [activeTab, setActiveTab] = useState<"video" | "photo">("video");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Create Content</h1>
          <p className="text-base-content/60">Upload your videos or product photos to the platform</p>
        </div>

        {/* Tab System */}
        <div className="tabs tabs-boxed justify-center p-1 bg-base-200 rounded-2xl">
          <button
            className={`tab tab-lg gap-2 rounded-xl transition-all ${activeTab === 'video' ? 'tab-active bg-primary text-primary-content shadow-lg' : ''}`}
            onClick={() => setActiveTab("video")}
          >
            <Video className="w-5 h-5" />
            Video Reel
          </button>
          <button
            className={`tab tab-lg gap-2 rounded-xl transition-all ${activeTab === 'photo' ? 'tab-active bg-primary text-primary-content shadow-lg' : ''}`}
            onClick={() => setActiveTab("photo")}
          >
            <ImageIcon className="w-5 h-5" />
            Photo/Product
          </button>
        </div>

        <div className="mt-8 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {activeTab === "video" ? (
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Upload New Reel</h2>
                <VideoUploadForm />
              </div>
            </div>
          ) : (
            <PhotoUploadForm />
          )}
        </div>
      </div>
    </div>
  );
}