"use client";

import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
    maxImages?: number;
}

export default function ImageUpload({ value = [], onChange, maxImages = 5 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'adire-products');

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.secure_url;
    };

    const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const remainingSlots = maxImages - value.length;
        if (remainingSlots <= 0) {
            toast.error(`Maximum ${maxImages} images allowed`);
            return;
        }

        const filesToUpload = Array.from(files).slice(0, remainingSlots);

        setUploading(true);
        try {
            const uploadPromises = filesToUpload.map(file => uploadToCloudinary(file));
            const uploadedUrls = await Promise.all(uploadPromises);

            onChange([...value, ...uploadedUrls]);
            toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload images. Please try again.');
        } finally {
            setUploading(false);
        }
    }, [value, onChange, maxImages]);

    const handleRemove = useCallback((index: number) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange(newValue);
        toast.success('Image removed');
    }, [value, onChange]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {value.map((url, index) => (
                    <div key={url} className="relative group aspect-square">
                        <img
                            src={url}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover rounded-md border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                                Primary
                            </div>
                        )}
                    </div>
                ))}

                {value.length < maxImages && (
                    <label className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-md hover:border-muted-foreground/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleUpload}
                            disabled={uploading}
                            className="hidden"
                        />
                        {uploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                <span className="text-xs text-muted-foreground">Uploading...</span>
                            </div>
                        ) : (
                            <>
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground text-center px-2">
                                    Click to upload<br />
                                    ({value.length}/{maxImages})
                                </span>
                            </>
                        )}
                    </label>
                )}
            </div>

            {value.length === 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                    <ImageIcon className="h-4 w-4" />
                    <p>Upload at least one product image. The first image will be the primary image.</p>
                </div>
            )}
        </div>
    );
}
