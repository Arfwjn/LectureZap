import { Folder, BookOpen, Zap, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Neural Networks 101",
    course: "CS Advanced AI",
    date: "May 7, 2025",
    duration: "1h 23m",
    badge: "DONE!",
    badgeColor: "#00F0FF",
    active: true,
    topics: 12,
  },
  {
    id: 2,
    title: "Quantum Computing Basics",
    course: "PHYS 420",
    date: "May 5, 2025",
    duration: "58m",
    badge: "ZAP!",
    badgeColor: "#FFCC00",
    active: false,
    topics: 8,
  },
  {
    id: 3,
    title: "Organic Chemistry Lab",
    course: "CHEM 301",
    date: "May 3, 2025",
    duration: "1h 45m",
    badge: "BOOM!",
    badgeColor: "#FF0055",
    active: false,
    topics: 15,
  },
  {
    id: 4,
    title: "Macroeconomics Theory",
    course: "ECON 201",
    date: "Apr 30, 2025",
    duration: "1h 10m",
    badge: "DONE!",
    badgeColor: "#00F0FF",
    active: false,
    topics: 10,
  },
  {
    id: 5,
    title: "World History: WWII",
    course: "HIST 150",
    date: "Apr 28, 2025",
    duration: "2h 05m",
    badge: "ZAP!",
    badgeColor: "#FFCC00",
    active: false,
    topics: 18,
  },
];

interface LZSidebarProps {
  open: boolean;
}

function StarburstBadge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="inline-flex items-center justify-center px-2 py-0.5 text-xs uppercase"
      style={{
        fontFamily: "'Bangers', cursive",
        fontSize: "0.7rem",
        letterSpacing: "0.05em",
        backgroundColor: color,
        color: "#000",
        border: "2px solid #000",
        boxShadow: "2px 2px 0px #000",
        clipPath:
          "polygon(50% 0%, 61% 15%, 79% 10%, 75% 28%, 95% 30%, 84% 45%, 99% 55%, 85% 63%, 90% 82%, 73% 80%, 70% 100%, 55% 88%, 40% 100%, 37% 80%, 20% 82%, 25% 63%, 11% 55%, 26% 45%, 15% 30%, 35% 28%, 21% 10%, 39% 15%)",
        width: "44px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {text}
    </span>
  );
}

export function LZSidebar({ open }: LZSidebarProps) {
  return (
    <aside
      className="flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        width: open ? "260px" : "0px",
        borderRight: open ? "4px solid #000" : "none",
        backgroundColor: "#FFF9E6",
        overflowY: open ? "auto" : "hidden",
      }}
    >
      <div className="p-4" style={{ minWidth: "260px" }}>
        {/* Sidebar Header */}
        <div
          className="flex items-center gap-2 mb-4 pb-3"
          style={{ borderBottom: "3px solid #000" }}
        >
          <Folder size={20} strokeWidth={3} color="#000" />
          <span
            className="uppercase text-xl"
            style={{
              fontFamily: "'Bangers', cursive",
              letterSpacing: "0.08em",
              color: "#000",
              textShadow: "1px 1px 0px rgba(0,0,0,0.2)",
            }}
          >
            My Library
          </span>
          <span
            className="ml-auto flex items-center justify-center w-6 h-6 text-xs"
            style={{
              backgroundColor: "#FF0055",
              color: "#fff",
              border: "2px solid #000",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {projects.length}
          </span>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative cursor-pointer transition-all duration-100 p-3"
              style={{
                backgroundColor: project.active ? "#FFCC00" : "#fff",
                border: project.active ? "3px solid #000" : "3px solid #000",
                boxShadow: project.active ? "4px 4px 0px #000" : "3px 3px 0px #000",
              }}
              onMouseEnter={(e) => {
                if (!project.active) {
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(-2px, -2px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "5px 5px 0px #000";
                }
              }}
              onMouseLeave={(e) => {
                if (!project.active) {
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(0,0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0px #000";
                }
              }}
            >
              {/* Halftone overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="relative z-10 flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <BookOpen size={12} strokeWidth={3} color="#000" />
                    <span
                      className="text-xs uppercase truncate"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.6rem",
                        color: "#000",
                        opacity: 0.7,
                      }}
                    >
                      {project.course}
                    </span>
                  </div>
                  <p
                    className="text-sm uppercase leading-tight mb-1"
                    style={{
                      fontFamily: "'Bangers', cursive",
                      fontSize: "1rem",
                      letterSpacing: "0.04em",
                      color: "#000",
                    }}
                  >
                    {project.title}
                  </p>
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#000",
                      opacity: 0.75,
                    }}
                  >
                    <span>{project.date}</span>
                    <span>·</span>
                    <span>{project.duration}</span>
                  </div>
                  <div
                    className="flex items-center gap-1 mt-1"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.6rem",
                      color: "#000",
                      opacity: 0.7,
                    }}
                  >
                    <Zap size={10} fill="#FFCC00" color="#000" />
                    <span>{project.topics} timestamps</span>
                  </div>
                </div>
                <StarburstBadge text={project.badge} color={project.badgeColor} />
              </div>
              {project.active && (
                <div
                  className="flex items-center gap-1 mt-2 pt-2"
                  style={{ borderTop: "2px solid #000" }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#000",
                    }}
                  >
                    Currently viewing
                  </span>
                  <ChevronRight size={12} strokeWidth={3} color="#000" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upload new CTA */}
        <button
          className="w-full mt-4 py-3 uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-100"
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "1rem",
            letterSpacing: "0.08em",
            backgroundColor: "#000",
            color: "#FFCC00",
            border: "3px solid #000",
            boxShadow: "4px 4px 0px #FF0055",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(-2px, -2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "6px 6px 0px #FF0055";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #FF0055";
          }}
        >
          <Zap size={14} fill="#FFCC00" strokeWidth={0} />
          + New Lecture
        </button>
      </div>
    </aside>
  );
}
