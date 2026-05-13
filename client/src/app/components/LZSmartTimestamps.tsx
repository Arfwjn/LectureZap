import { useState } from "react";
import { Zap, Star } from "lucide-react";

const timestamps = [
  { time: "00:00", label: "Course Introduction", tag: "INTRO", color: "#FFCC00" },
  { time: "03:22", label: "Neural Network Intro", tag: "CONCEPT", color: "#00F0FF" },
  { time: "08:14", label: "Perceptron Model Explained", tag: "KEY", color: "#00F0FF" },
  { time: "14:50", label: "Important Formula: Backprop", tag: "⚠️ EXAM", color: "#FF0055" },
  { time: "21:05", label: "Activation Functions Deep Dive", tag: "CONCEPT", color: "#00F0FF" },
  { time: "27:10", label: "Final Exam Hint Dropped!", tag: "🔥 HOT", color: "#FF0055" },
  { time: "33:48", label: "Loss Function Visualization", tag: "VISUAL", color: "#FFCC00" },
  { time: "41:22", label: "Gradient Descent Step-by-Step", tag: "CONCEPT", color: "#00F0FF" },
  { time: "52:30", label: "Prof's Personal Tips", tag: "💡 TIP", color: "#FFCC00" },
  { time: "01:01:10", label: "Student Q&A Session", tag: "Q&A", color: "#00F0FF" },
];

export function LZSmartTimestamps() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div
      className="mt-4"
      style={{
        border: "4px solid #000",
        boxShadow: "6px 6px 0px #000",
        backgroundColor: "#FFF9E6",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-2"
        style={{
          backgroundColor: "#000",
          borderBottom: "4px solid #000",
        }}
      >
        <Zap size={16} fill="#FFCC00" color="#FFCC00" />
        <span
          className="uppercase"
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "1.1rem",
            letterSpacing: "0.1em",
            color: "#FFCC00",
          }}
        >
          Smart Timestamps
        </span>
        <span
          className="ml-auto flex items-center gap-1"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "#00F0FF",
          }}
        >
          <Star size={10} fill="#00F0FF" strokeWidth={0} />
          AI-Generated
        </span>
      </div>

      {/* Halftone overlay */}
      <div className="relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            zIndex: 0,
          }}
        />
        {/* Timestamps pills */}
        <div
          className="relative z-10 p-3 flex flex-wrap gap-2"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {timestamps.map((ts, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i === activeIndex ? null : i)}
              className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer transition-all duration-100"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                backgroundColor: activeIndex === i ? ts.color : "#fff",
                color: "#000",
                border: `2px solid #000`,
                boxShadow:
                  activeIndex === i
                    ? "3px 3px 0px #000"
                    : "2px 2px 0px #000",
                transform:
                  activeIndex === i ? "translate(-1px, -1px)" : "translate(0,0)",
              }}
              onMouseEnter={(e) => {
                if (activeIndex !== i) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = ts.color;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translate(-2px, -2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #000";
                }
              }}
              onMouseLeave={(e) => {
                if (activeIndex !== i) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0px #000";
                }
              }}
            >
              <Zap size={10} fill={ts.color === "#fff" ? "#000" : "#000"} strokeWidth={0} />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                {ts.time}
              </span>
              <span
                className="hidden sm:inline"
                style={{
                  fontSize: "0.65rem",
                  color: "#000",
                  opacity: 0.8,
                }}
              >
                {ts.label}
              </span>
              <span
                className="px-1 py-0.5 text-xs"
                style={{
                  backgroundColor: ts.color,
                  color: "#000",
                  border: "1px solid #000",
                  fontFamily: "'Bangers', cursive",
                  fontSize: "0.6rem",
                  letterSpacing: "0.04em",
                }}
              >
                {ts.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
