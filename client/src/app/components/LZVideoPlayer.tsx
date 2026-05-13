import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Zap } from "lucide-react";

const THUMBNAIL =
  "https://images.unsplash.com/photo-1757192420329-39acf20a12b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NzgzNDM5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface LZVideoPlayerProps {
  onTimestampClick?: (time: number) => void;
}

export function LZVideoPlayer({ onTimestampClick }: LZVideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(18); // 18% progress as demo
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (percent: number) => {
    const totalSeconds = Math.floor((percent / 100) * 4980); // 83 min video
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, pct)));
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setHoverProgress(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div
      className="relative"
      style={{
        border: "4px solid #000",
        boxShadow: "6px 6px 0px #000",
        backgroundColor: "#000",
      }}
    >
      {/* Video Display Area */}
      <div className="relative" style={{ paddingBottom: "56.25%" }}>
        <img
          src={THUMBNAIL}
          alt="Lecture Video"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: playing ? 1 : 0.85 }}
        />
        {/* Overlay tint */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
        />

        {/* Title badge top-left */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: "#000",
            border: "2px solid #FFCC00",
            boxShadow: "2px 2px 0px #FFCC00",
          }}
        >
          <Zap size={12} fill="#FFCC00" color="#FFCC00" />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "#FFCC00",
              letterSpacing: "0.08em",
            }}
          >
            CS ADV AI — LECTURE 07
          </span>
        </div>

        {/* LIVE badge top-right */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: "#FF0055",
            border: "2px solid #000",
            boxShadow: "2px 2px 0px #000",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: "0.8rem",
              color: "#fff",
              letterSpacing: "0.1em",
            }}
          >
            REC
          </span>
        </div>

        {/* Play/Pause big button */}
        <button
          onClick={() => setPlaying(!playing)}
          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          style={{ background: "transparent" }}
        >
          <div
            className="flex items-center justify-center w-16 h-16 transition-all duration-100"
            style={{
              backgroundColor: playing ? "transparent" : "#FFCC00",
              border: playing ? "none" : "4px solid #000",
              boxShadow: playing ? "none" : "4px 4px 0px #000",
              opacity: playing ? 0 : 1,
            }}
          >
            {playing ? (
              <Pause size={28} fill="#fff" color="#fff" />
            ) : (
              <Play size={28} fill="#000" color="#000" />
            )}
          </div>
        </button>
      </div>

      {/* Controls Bar */}
      <div
        className="px-3 pt-2 pb-2"
        style={{ backgroundColor: "#000" }}
      >
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="relative h-3 cursor-pointer mb-2"
          style={{
            backgroundColor: "#333",
            border: "2px solid #555",
          }}
          onClick={handleProgressClick}
          onMouseMove={handleProgressMouseMove}
          onMouseLeave={() => setHoverProgress(null)}
        >
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "#FFCC00",
              transition: "none",
            }}
          />
          {/* Hover preview */}
          {hoverProgress !== null && (
            <div
              className="absolute -top-7 px-1 py-0.5"
              style={{
                left: `${hoverProgress}%`,
                transform: "translateX(-50%)",
                backgroundColor: "#FFCC00",
                border: "2px solid #000",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                color: "#000",
                whiteSpace: "nowrap",
              }}
            >
              {formatTime(hoverProgress)}
            </div>
          )}
          {/* Chapter markers */}
          {[14.2, 32.5, 58.1, 74.3].map((pos, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.5"
              style={{
                left: `${pos}%`,
                backgroundColor: "#00F0FF",
              }}
            />
          ))}
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3"
            style={{
              left: `calc(${progress}% - 6px)`,
              backgroundColor: "#FFCC00",
              border: "2px solid #000",
            }}
          />
        </div>

        {/* Control buttons row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center w-7 h-7 cursor-pointer transition-all"
              style={{ color: "#fff" }}
              onClick={() => setProgress(Math.max(0, progress - 5))}
            >
              <SkipBack size={14} fill="#fff" strokeWidth={0} />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="flex items-center justify-center w-8 h-8 cursor-pointer transition-all duration-100"
              style={{
                backgroundColor: "#FFCC00",
                border: "2px solid #FFCC00",
              }}
            >
              {playing ? (
                <Pause size={14} fill="#000" color="#000" />
              ) : (
                <Play size={14} fill="#000" color="#000" />
              )}
            </button>
            <button
              className="flex items-center justify-center w-7 h-7 cursor-pointer transition-all"
              style={{ color: "#fff" }}
              onClick={() => setProgress(Math.min(100, progress + 5))}
            >
              <SkipForward size={14} fill="#fff" strokeWidth={0} />
            </button>
            <button
              onClick={() => setMuted(!muted)}
              className="flex items-center justify-center w-7 h-7 cursor-pointer"
              style={{ color: muted ? "#FF0055" : "#fff" }}
            >
              {muted ? <VolumeX size={14} strokeWidth={2.5} /> : <Volume2 size={14} strokeWidth={2.5} />}
            </button>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: "#FFCC00",
              }}
            >
              {formatTime(progress)} / {formatTime(100)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-1.5 py-0.5 text-xs"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                color: "#000",
                backgroundColor: "#00F0FF",
                border: "2px solid #000",
              }}
            >
              1.25×
            </span>
            <button
              className="flex items-center justify-center w-7 h-7 cursor-pointer"
              style={{ color: "#fff" }}
            >
              <Maximize2 size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
