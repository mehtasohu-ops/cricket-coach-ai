import { Upload, Video } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export const UploadZone = ({ onFileSelect, isAnalyzing }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300",
        isDragging
          ? "border-accent bg-accent/5 scale-[1.02]"
          : "border-border hover:border-accent/50 hover:bg-muted/30",
        isAnalyzing && "opacity-50 pointer-events-none"
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow">
            {isDragging ? (
              <Upload className="w-10 h-10 text-accent-foreground animate-bounce" />
            ) : (
              <Video className="w-10 h-10 text-accent-foreground" />
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            {isDragging ? "Drop your video here" : "Upload Cricket Video"}
          </h3>
          <p className="text-muted-foreground max-w-sm">
            Drag and drop your bowling, batting, or throwing video, or click to browse
          </p>
        </div>

        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzing}
          className="bg-gradient-accent hover:shadow-glow transition-all"
        >
          <Upload className="w-4 h-4 mr-2" />
          Select Video File
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileInput}
          className="hidden"
        />

        <p className="text-xs text-muted-foreground">
          Supported formats: MP4, MOV, AVI (Max 50MB)
        </p>
      </div>
    </div>
  );
};
