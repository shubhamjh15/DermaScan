"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onImageSelected: (file: File | null, previewUrl: string | null) => void;
}

export default function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  // --- REORDERED DEFINITIONS START ---

  // 1. Define removeImage first (depends only on onImageSelected prop)
  const removeImage = useCallback(() => {
    console.log("[Uploader] removeImage called."); // <<< DEBUG LOG >>>
    setImagePreview(null)
    setSelectedFile(null);
    console.log("[Uploader] Calling onImageSelected(null, null)."); // <<< DEBUG LOG >>>
    onImageSelected(null, null); // Notify parent
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [onImageSelected]) // Dependency: onImageSelected

  // 2. Define handleFile (depends on onImageSelected and removeImage)
  const handleFile = useCallback((file: File) => {
    console.log("[Uploader] handleFile called with file:", file?.name, "type:", file?.type); // <<< DEBUG LOG >>>
    if (!file.type.startsWith("image/")) {
       console.warn("[Uploader] Invalid file type:", file.type); // <<< DEBUG LOG >>>
       alert("Please upload an image file (JPG, PNG, etc.)");
       removeImage(); // Use removeImage defined above
       return;
     }

     setSelectedFile(file);

     const reader = new FileReader();
     reader.onload = (loadEvent) => {
       if (loadEvent.target && typeof loadEvent.target.result === "string") {
         const previewUrl = loadEvent.target.result;
         console.log("[Uploader] FileReader success. Preview URL starts with:", previewUrl.substring(0, 50) + '...'); // <<< DEBUG LOG >>>
         setImagePreview(previewUrl);
         console.log("[Uploader] Calling onImageSelected with file and preview URL."); // <<< DEBUG LOG >>>
         onImageSelected(file, previewUrl); // Use onImageSelected prop
       } else {
           console.error("[Uploader] FileReader error or result is not a string. loadEvent.target:", loadEvent.target); // <<< DEBUG LOG >>>
           removeImage(); // Use removeImage defined above
       }
     };
      reader.onerror = () => {
          console.error("[Uploader] FileReader failed to read the file.", reader.error); // <<< DEBUG LOG >>>
          removeImage(); // Use removeImage defined above
      };
     console.log("[Uploader] Calling reader.readAsDataURL for file:", file.name); // <<< DEBUG LOG >>>
     reader.readAsDataURL(file);
   }, [onImageSelected, removeImage]); // Dependencies: onImageSelected, removeImage

  // 3. Define handleDrop (depends on handleFile)
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]) // Use handleFile defined above
    }
  }, [handleFile]) // Dependency: handleFile

  // 4. Define handleFileChange (depends on handleFile)
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]) // Use handleFile defined above
    }
  }, [handleFile]) // Dependency: handleFile

  // --- OTHER CALLBACKS (order less critical as they don't depend on the above) ---
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  // --- REORDERED DEFINITIONS END ---


  return (
    <div className="space-y-4">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      {!imagePreview ? (
        // --- Upload Dropzone UI ---
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop} // Uses handleDrop defined above
        >
           <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              className="rounded-full bg-primary/10 p-3"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <ImageIcon className="h-8 w-8 text-primary" />
            </motion.div>
             <div>
               <p className="text-lg font-medium">Drag and drop your image here</p>
               <p className="text-sm text-muted-foreground mt-1">or click to select</p>
             </div>
             <Button onClick={triggerFileInput} variant="outline" className="group mt-4">
               <Upload className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" /> Select Image
             </Button>
           </div>
           <p className="text-xs text-muted-foreground mt-4">Supported formats: JPG, PNG, HEIC, WEBP - Max size: 10MB</p>
        </div>
      ) : (
        // --- Image Preview UI ---
        <div className="relative rounded-lg overflow-hidden border border-border">
           {console.log("[Uploader] Rendering Image Preview UI. imagePreview state:", imagePreview ? imagePreview.substring(0,50)+'...' : 'null')} {/* <<< DEBUG LOG >>> */}
           <img
             src={imagePreview}
             alt="Uploaded preview"
             className="w-full h-auto max-h-[400px] object-contain"
             onError={(e) => console.error("[Uploader] Preview image failed to load:", e)} // <<< DEBUG LOGGING ATTRIBUTES >>>
             onLoad={() => console.log("[Uploader] Preview image loaded successfully.")} // <<< DEBUG LOGGING ATTRIBUTES >>>
           />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={removeImage} // Uses removeImage defined above
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}