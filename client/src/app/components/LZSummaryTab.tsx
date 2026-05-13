import { Zap, BookOpen, AlertCircle, Lightbulb, Brain } from "lucide-react";

const summaryCards = [
  {
    id: 1,
    type: "main",
    icon: Brain,
    title: "Core Concept: Neural Networks",
    timestamp: "03:22 – 14:49",
    color: "#FFCC00",
    rotate: "-1deg",
    points: [
      "Neural networks mimic biological brain synapses",
      "Composed of input, hidden, and output layers",
      "Each node applies a weighted sum + activation function",
      "Deep networks have 3+ hidden layers",
    ],
  },
  {
    id: 2,
    type: "formula",
    icon: AlertCircle,
    title: "⚠️ Key Formula: Backpropagation",
    timestamp: "14:50 – 21:04",
    color: "#FF0055",
    rotate: "1deg",
    points: [
      "∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w",
      "Chain rule applied layer-by-layer",
      "Learning rate η controls step size",
      "Gradient vanishing problem in deep nets",
    ],
  },
  {
    id: 3,
    type: "concept",
    icon: Lightbulb,
    title: "Activation Functions",
    timestamp: "21:05 – 27:09",
    color: "#00F0FF",
    rotate: "-0.5deg",
    points: [
      "ReLU: max(0, x) — Most popular, avoids dying neurons",
      "Sigmoid: σ(x) = 1/(1+e^-x) — Outputs [0,1]",
      "Tanh: outputs [-1, 1], zero-centered",
      "Softmax: multi-class classification output layer",
    ],
  },
  {
    id: 4,
    type: "exam",
    icon: AlertCircle,
    title: "🔥 Final Exam Hint",
    timestamp: "27:10 – 33:47",
    color: "#FF0055",
    rotate: "1.5deg",
    points: [
      "Know the difference between L1 vs L2 regularization",
      "Dropout prevents overfitting — WILL be tested!",
      "Batch normalization accelerates training",
      "\"Understand, don't memorize\" — Prof's exact words",
    ],
  },
  {
    id: 5,
    type: "visual",
    icon: BookOpen,
    title: "Loss Functions",
    timestamp: "33:48 – 41:21",
    color: "#FFCC00",
    rotate: "-1deg",
    points: [
      "MSE for regression tasks: Σ(y - ŷ)² / n",
      "Cross-entropy for classification",
      "Hinge loss used in SVMs",
      "Loss landscape is non-convex — local minima exist",
    ],
  },
];

function SummaryCard({
  card,
}: {
  card: (typeof summaryCards)[0];
}) {
  const Icon = card.icon;
  return (
    <div
      className="relative p-4 transition-all duration-100"
      style={{
        backgroundColor: "#FFF9E6",
        border: "3px solid #000",
        boxShadow: "6px 6px 0px #000",
        transform: `rotate(${card.rotate})`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = `rotate(${card.rotate}) translate(-2px, -2px)`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = "8px 8px 0px #000";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = `rotate(${card.rotate})`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 0px #000";
      }}
    >
      {/* Halftone pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      {/* Color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: card.color, borderBottom: "2px solid #000" }}
      />

      <div className="relative z-10 pt-1">
        {/* Card header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-7 h-7 flex-shrink-0"
              style={{
                backgroundColor: card.color,
                border: "2px solid #000",
              }}
            >
              <Icon size={14} strokeWidth={3} color="#000" />
            </div>
            <h3
              className="uppercase leading-tight"
              style={{
                fontFamily: "'Bangers', cursive",
                fontSize: "1.05rem",
                letterSpacing: "0.04em",
                color: "#000",
                textShadow: "1px 1px 0px rgba(0,0,0,0.1)",
              }}
            >
              {card.title}
            </h3>
          </div>
          <span
            className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              color: "#000",
              backgroundColor: "#00F0FF",
              border: "2px solid #000",
              whiteSpace: "nowrap",
            }}
          >
            <Zap size={8} fill="#000" strokeWidth={0} />
            {card.timestamp}
          </span>
        </div>

        {/* Bullet points */}
        <ul className="space-y-1.5">
          {card.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                color: "#000",
                lineHeight: 1.5,
              }}
            >
              <span
                className="flex-shrink-0 w-4 h-4 flex items-center justify-center mt-0.5"
                style={{
                  backgroundColor: card.color,
                  border: "1.5px solid #000",
                  fontSize: "0.55rem",
                  fontFamily: "'Bangers', cursive",
                }}
              >
                {i + 1}
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LZSummaryTab() {
  return (
    <div className="flex flex-col gap-1">
      {/* Stats row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {[
          { label: "Topics", val: "12", color: "#FFCC00" },
          { label: "Key Terms", val: "34", color: "#00F0FF" },
          { label: "Exam Hints", val: "3", color: "#FF0055" },
          { label: "Formulas", val: "8", color: "#FFCC00" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-1 px-2 py-1"
            style={{
              backgroundColor: stat.color,
              border: "2px solid #000",
              boxShadow: "2px 2px 0px #000",
            }}
          >
            <span
              style={{
                fontFamily: "'Bangers', cursive",
                fontSize: "1rem",
                letterSpacing: "0.04em",
                color: "#000",
              }}
            >
              {stat.val}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                color: "#000",
                opacity: 0.8,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Summary cards */}
      <div className="flex flex-col gap-5 pb-2">
        {summaryCards.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
