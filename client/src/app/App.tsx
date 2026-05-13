import { useState } from "react";
import { LZHeader } from "./components/LZHeader";
import { LZSidebar } from "./components/LZSidebar";
import { LZVideoPlayer } from "./components/LZVideoPlayer";
import { LZSmartTimestamps } from "./components/LZSmartTimestamps";
import { LZSummaryTab } from "./components/LZSummaryTab";
import { LZChatTab } from "./components/LZChatTab";
import { FileText, MessageSquare, Zap, Star, Cpu } from "lucide-react";

type Tab = "summary" | "chat";

function StarburstBadge({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "56px",
        height: "56px",
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <polygon
          points="50,2 61,25 87,18 77,42 99,50 77,58 87,82 61,75 50,98 39,75 13,82 23,58 1,50 23,42 13,18 39,25"
          fill={color}
          stroke="#000"
          strokeWidth="4"
        />
      </svg>
      <span
        className="relative z-10 text-center"
        style={{
          fontFamily: "'Bangers', cursive",
          fontSize: "0.68rem",
          color: "#000",
          letterSpacing: "0.02em",
          lineHeight: 1.1,
          textAlign: "center",
          maxWidth: "36px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function AIStatusBar() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-1.5 flex-wrap"
      style={{
        backgroundColor: "#000",
        borderBottom: "3px solid #000",
      }}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "#00F0FF",
            letterSpacing: "0.08em",
          }}
        >
          AI ACTIVE
        </span>
      </div>
      <span style={{ color: "#333", fontSize: "0.7rem" }}>|</span>
      <div className="flex items-center gap-1">
        <Cpu size={10} color="#FFCC00" />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: "#FFCC00",
          }}
        >
          Transcription: Complete
        </span>
      </div>
      <span style={{ color: "#333", fontSize: "0.7rem" }}>|</span>
      <div className="flex items-center gap-1">
        <Star size={10} fill="#FF0055" strokeWidth={0} />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: "#FF0055",
          }}
        >
          OCR: Complete
        </span>
      </div>
      <span style={{ color: "#333", fontSize: "0.7rem" }}>|</span>
      <div className="flex items-center gap-1">
        <Zap size={10} fill="#FFCC00" strokeWidth={0} />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: "#FFCC00",
          }}
        >
          RAG Index: 1,247 chunks
        </span>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: "#555",
          }}
        >
          Neural Networks 101 · CS ADV AI · Lecture 07
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("summary");

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: "#FFF9E6", fontFamily: "'Space Mono', monospace" }}
    >
      {/* Header */}
      <LZHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* AI Status Bar */}
      <AIStatusBar />

      {/* Main workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <LZSidebar open={sidebarOpen} />

        {/* Content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT PANEL — Video + Timestamps */}
          <div
            className="flex flex-col overflow-y-auto"
            style={{
              width: "50%",
              minWidth: "300px",
              borderRight: "4px solid #000",
              padding: "20px",
              backgroundColor: "#FFF9E6",
            }}
          >
            {/* Panel label */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2"
                  style={{ backgroundColor: "#FF0055", border: "2px solid #000" }}
                />
                <span
                  className="uppercase"
                  style={{
                    fontFamily: "'Bangers', cursive",
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    color: "#000",
                  }}
                >
                  Video Player
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StarburstBadge label="ZAP!" color="#FFCC00" />
                <StarburstBadge label="DONE!" color="#00F0FF" />
              </div>
            </div>

            {/* Video Player */}
            <LZVideoPlayer />

            {/* Smart Timestamps */}
            <LZSmartTimestamps />

            {/* Bottom filler */}
            <div className="flex-1 min-h-8" />
          </div>

          {/* RIGHT PANEL — Tabs */}
          <div
            className="flex flex-col overflow-hidden"
            style={{
              width: "50%",
              minWidth: "300px",
              backgroundColor: "#FFF9E6",
            }}
          >
            {/* Tab headers */}
            <div
              className="flex"
              style={{ borderBottom: "4px solid #000", flexShrink: 0 }}
            >
              <button
                onClick={() => setActiveTab("summary")}
                className="flex items-center gap-2 px-5 py-3 cursor-pointer transition-all duration-100"
                style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "1.1rem",
                  letterSpacing: "0.06em",
                  backgroundColor: activeTab === "summary" ? "#FFCC00" : "#fff",
                  color: "#000",
                  border: "none",
                  borderRight: "3px solid #000",
                  boxShadow:
                    activeTab === "summary"
                      ? "inset 0 -4px 0 #000"
                      : "none",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <FileText size={16} strokeWidth={3} />
                Summary
                {activeTab === "summary" && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#FF0055", border: "2px solid #000" }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className="flex items-center gap-2 px-5 py-3 cursor-pointer transition-all duration-100"
                style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "1.1rem",
                  letterSpacing: "0.06em",
                  backgroundColor: activeTab === "chat" ? "#00F0FF" : "#fff",
                  color: "#000",
                  border: "none",
                  boxShadow:
                    activeTab === "chat" ? "inset 0 -4px 0 #000" : "none",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <MessageSquare size={16} strokeWidth={3} />
                Chat with Video
                {activeTab === "chat" && (
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "#FF0055", border: "2px solid #000" }}
                  />
                )}
              </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "summary" ? (
                <div className="p-5">
                  {/* Summary tab header */}
                  <div
                    className="flex items-center gap-2 mb-4 pb-3"
                    style={{ borderBottom: "3px solid #000" }}
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8"
                      style={{
                        backgroundColor: "#FFCC00",
                        border: "3px solid #000",
                        boxShadow: "2px 2px 0px #000",
                      }}
                    >
                      <FileText size={16} strokeWidth={3} color="#000" />
                    </div>
                    <div>
                      <h2
                        className="uppercase"
                        style={{
                          fontFamily: "'Bangers', cursive",
                          fontSize: "1.3rem",
                          letterSpacing: "0.06em",
                          color: "#000",
                          textShadow: "1px 1px 0px rgba(0,0,0,0.15)",
                          lineHeight: 1,
                        }}
                      >
                        Lecture Summary
                      </h2>
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.65rem",
                          color: "#000",
                          opacity: 0.6,
                        }}
                      >
                        Neural Networks 101 · AI-generated
                      </p>
                    </div>
                    <div className="ml-auto">
                      <StarburstBadge label="BOOM!" color="#FF0055" />
                    </div>
                  </div>
                  <LZSummaryTab />
                </div>
              ) : (
                <div
                  className="flex flex-col h-full"
                  style={{ minHeight: "500px" }}
                >
                  {/* Chat header */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
                    style={{ borderBottom: "3px solid #000", backgroundColor: "#fff" }}
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8"
                      style={{
                        backgroundColor: "#00F0FF",
                        border: "3px solid #000",
                        boxShadow: "2px 2px 0px #000",
                      }}
                    >
                      <MessageSquare size={16} strokeWidth={3} color="#000" />
                    </div>
                    <div>
                      <h2
                        className="uppercase"
                        style={{
                          fontFamily: "'Bangers', cursive",
                          fontSize: "1.1rem",
                          letterSpacing: "0.06em",
                          color: "#000",
                          lineHeight: 1,
                        }}
                      >
                        Chat with Video
                      </h2>
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.6rem",
                          color: "#000",
                          opacity: 0.6,
                        }}
                      >
                        Context-aware RAG · 1,247 indexed chunks
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.6rem",
                          color: "#000",
                          opacity: 0.7,
                        }}
                      >
                        ZapBot Online
                      </span>
                    </div>
                  </div>
                  <LZChatTab />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        className="flex items-center gap-4 px-4 py-1.5"
        style={{
          borderTop: "3px solid #000",
          backgroundColor: "#FFCC00",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: "#000",
            opacity: 0.7,
          }}
        >
          LectureZap v1.0 · Smart Academic AI
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <Zap size={10} fill="#000" strokeWidth={0} />
          <span
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              color: "#000",
            }}
          >
            Powered by ZapAI Engine
          </span>
        </div>
      </div>
    </div>
  );
}
