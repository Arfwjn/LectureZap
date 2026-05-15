import { useState, useRef } from "react";
import { Upload, User, Zap, Menu, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../services/api"; // Sesuaikan path ini dengan lokasi api.ts Anda

interface LZHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function LZHeader({ sidebarOpen, onToggleSidebar }: LZHeaderProps) {
  const [uploadHover, setUploadHover] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Memicu input file tersembunyi saat tombol kustom ditekan
  const handleUploadClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  // Mengirim file ke backend dan melakukan navigasi
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await uploadVideo(file);
      navigate(`/lecture/${result.lectureId}`);
    } catch (error) {
      console.error("Upload gagal:", error);
      alert("Gagal mengunggah video. Periksa koneksi ke server backend.");
    } finally {
      setIsUploading(false);
      // Reset input agar bisa memilih file yang sama lagi jika gagal
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <header
      className="relative z-50 flex items-center justify-between px-6 py-3"
      style={{
        backgroundColor: "#FFCC00",
        borderBottom: "4px solid #000000",
        fontFamily: "'Bangers', cursive",
      }}
    >
      {/* Action lines background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 13px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* Sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="flex items-center justify-center w-10 h-10 cursor-pointer transition-all duration-100"
          style={{
            border: "3px solid #000",
            backgroundColor: "#000",
            color: "#FFCC00",
            boxShadow: "3px 3px 0px #000",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(-2px, -2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px #000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px #000";
          }}
        >
          {sidebarOpen ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={3} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-10 h-10"
            style={{
              backgroundColor: "#000",
              border: "3px solid #000",
            }}
          >
            <Zap size={22} fill="#FFCC00" color="#FFCC00" strokeWidth={2} />
          </div>
          <span
            className="text-4xl tracking-widest uppercase"
            style={{
              fontFamily: "'Bangers', cursive",
              color: "#000",
              textShadow: "2px 2px 0px rgba(0,0,0,0.15)",
              letterSpacing: "0.08em",
            }}
          >
            LectureZap
          </span>
          <span
            className="hidden sm:flex items-center gap-1 px-2 py-0.5 text-xs uppercase"
            style={{
              fontFamily: "'Space Mono', monospace",
              backgroundColor: "#FF0055",
              color: "#fff",
              border: "2px solid #000",
              boxShadow: "2px 2px 0px #000",
              letterSpacing: "0.05em",
            }}
          >
            BETA
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Hidden File Input */}
        <input 
          type="file" 
          accept="video/mp4" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
        />

        {/* Upload CTA */}
        <button
          onClick={handleUploadClick}
          onMouseEnter={() => setUploadHover(true)}
          onMouseLeave={() => setUploadHover(false)}
          disabled={isUploading}
          className="flex items-center gap-2 px-4 py-2 uppercase transition-all duration-100"
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "1.1rem",
            letterSpacing: "0.06em",
            backgroundColor: isUploading ? "#FFCC00" : (uploadHover ? "#000" : "#FFF9E6"),
            color: isUploading ? "#000" : (uploadHover ? "#FFCC00" : "#000"),
            border: "3px solid #000",
            boxShadow: uploadHover && !isUploading ? "6px 6px 0px #000" : "4px 4px 0px #000",
            transform: uploadHover && !isUploading ? "translate(-2px, -2px)" : "translate(0,0)",
            cursor: isUploading ? "wait" : "pointer",
            opacity: isUploading ? 0.8 : 1
          }}
        >
          {isUploading ? (
            <>
              <Loader2 size={16} strokeWidth={3} className="animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Upload size={16} strokeWidth={3} />
              Upload Video
            </>
          )}
        </button>

        {/* Avatar */}
        <div
          className="flex items-center justify-center w-10 h-10 cursor-pointer"
          style={{
            backgroundColor: "#00F0FF",
            border: "3px solid #000",
            boxShadow: "3px 3px 0px #000",
          }}
        >
          <User size={18} strokeWidth={3} color="#000" />
        </div>
      </div>
    </header>
  );
}