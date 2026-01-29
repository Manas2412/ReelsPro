"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, ImageIcon, Type, FileText } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient, ProductFormData } from "@/lib/api-client";
import FileUpload from "./FileUpload";

export default function PhotoUploadForm() {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { showNotification } = useNotification();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>({
        defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
        },
    });

    const imageUrl = watch("imageUrl");

    const handleUploadSuccess = (response: IKUploadResponse) => {
        setValue("imageUrl", response.filePath);
        setUploadProgress(100);
        showNotification("Image uploaded successfully!", "success");
    };

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    };

    const onSubmit = async (data: ProductFormData) => {
        if (!data.imageUrl) {
            showNotification("Please upload an image first", "error");
            return;
        }

        setLoading(true);
        try {
            await apiClient.createProduct(data);
            showNotification("Product listing created successfully!", "success");
            reset();
            setUploadProgress(0);
        } catch (error) {
            showNotification(
                error instanceof Error ? error.message : "Failed to create product",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Create Product Listing</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <Type className="w-4 h-4" /> Product Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Vintage Camera"
                            className={`input input-bordered w-full ${errors.name ? "input-error" : ""
                                }`}
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <span className="text-error text-xs mt-1">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Description
                            </span>
                        </label>
                        <textarea
                            className={`textarea textarea-bordered h-24 ${errors.description ? "textarea-error" : ""
                                }`}
                            placeholder="Tell us more about this product..."
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && (
                            <span className="text-error text-xs mt-1">
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" /> Product Photo
                            </span>
                        </label>
                        <FileUpload
                            fileType="image"
                            onSuccess={handleUploadSuccess}
                            onProgress={handleUploadProgress}
                        />
                        {uploadProgress > 0 && (
                            <div className="mt-2 space-y-1">
                                <progress
                                    className="progress progress-primary w-full"
                                    value={uploadProgress}
                                    max="100"
                                ></progress>
                                <p className="text-xs text-center text-base-content/50">{uploadProgress}% uploaded</p>
                            </div>
                        )}
                    </div>

                    <div className="card-actions justify-end mt-8">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block sm:btn-wide"
                            disabled={loading || !imageUrl}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Creating Listing...
                                </>
                            ) : (
                                "Create Product"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
