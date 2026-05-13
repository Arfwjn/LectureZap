import { useState, useRef, useEffect } from "react";
import { Send, Zap, Bot, User, Clock } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  time: string;
  timestamp?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Hey! I'm ZapBot ⚡ — your AI lecture buddy! I've analyzed all 1h 23m of Neural Networks 101. Ask me anything about the lecture!",
    time: "10:22 AM",
  },
  {
    id: 2,
    role: "user",
    text: "Can you explain backpropagation in simple terms?",
    time: "10:23 AM",
  },
  {
    id: 3,
    role: "ai",
    text: "Great question! 💡 Backprop is basically how the network \"learns from mistakes.\" It works backward from the output error, calculating how much each weight contributed to the wrong answer — then nudges them in the right direction using the chain rule. Think of it like telling each teammate how much they messed up the play!",
    time: "10:23 AM",
    timestamp: "14:50",
  },
  {
    id: 4,
    role: "user",
    text: "What did the professor say would be on the final exam?",
    time: "10:24 AM",
  },
  {
    id: 5,
    role: "ai",
    text: "🔥 HOT TIP! At 27:10 the prof literally said: \"Understand, don't memorize.\" He specifically called out: L1 vs L2 regularization, Dropout technique, and Batch Normalization. These 3 topics are almost certainly on the exam!",
    time: "10:24 AM",
    timestamp: "27:10",
  },
];

const suggestedQuestions = [
  "What are activation functions?",
  "Explain gradient descent visually",
  "Key formulas to memorize?",
  "What's the most important concept?",
];

interface ChatBubbleAIProps {
  message: Message;
}

function ChatBubbleAI({ message }: ChatBubbleAIProps) {
  return (
    <div className="flex items-start gap-2 mb-4">
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
        style={{
          backgroundColor: "#00F0FF",
          border: "3px solid #000",
          boxShadow: "2px 2px 0px #000",
        }}
      >
        <Bot size={14} strokeWidth={3} color="#000" />
      </div>

      <div className="flex-1 max-w-[85%]">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className="px-2 py-0.5 uppercase"
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              backgroundColor: "#00F0FF",
              color: "#000",
              border: "2px solid #000",
            }}
          >
            ZapBot AI
          </span>
          {message.timestamp && (
            <button
              className="flex items-center gap-1 px-1.5 py-0.5 cursor-pointer transition-all duration-100"
              style={{
                backgroundColor: "#FFCC00",
                border: "2px solid #000",
                boxShadow: "2px 2px 0px #000",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                color: "#000",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(-1px,-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px #000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0px #000";
              }}
            >
              <Zap size={8} fill="#000" strokeWidth={0} />⚡ {message.timestamp}
            </button>
          )}
          <span
            className="flex items-center gap-1"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              color: "#000",
              opacity: 0.5,
            }}
          >
            <Clock size={8} />
            {message.time}
          </span>
        </div>

        {/* Speech bubble */}
        <div
          className="relative px-4 py-3"
          style={{
            backgroundColor: "#fff",
            border: "3px solid #000",
            boxShadow: "4px 4px 0px #000",
            fontFamily: "'Comic Neue', cursive",
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#000",
            lineHeight: 1.55,
          }}
        >
          {/* Bubble tail */}
          <div
            className="absolute -left-3 top-4 w-0 h-0"
            style={{
              borderTop: "8px solid transparent",
              borderBottom: "8px solid #000",
              borderRight: "12px solid #000",
            }}
          />
          <div
            className="absolute -left-1.5 top-4 w-0 h-0"
            style={{
              borderTop: "8px solid transparent",
              borderBottom: "8px solid #fff",
              borderRight: "10px solid #fff",
            }}
          />
          {message.text}
        </div>
      </div>
    </div>
  );
}

function ChatBubbleUser({ message }: { message: Message }) {
  return (
    <div className="flex items-start gap-2 mb-4 flex-row-reverse">
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
        style={{
          backgroundColor: "#FFCC00",
          border: "3px solid #000",
          boxShadow: "2px 2px 0px #000",
        }}
      >
        <User size={14} strokeWidth={3} color="#000" />
      </div>

      <div className="flex-1 max-w-[85%] flex flex-col items-end">
        <span
          className="mb-1 flex items-center gap-1"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: "#000",
            opacity: 0.5,
          }}
        >
          <Clock size={8} />
          {message.time}
        </span>
        <div
          className="px-4 py-3"
          style={{
            backgroundColor: "#000",
            border: "3px solid #000",
            boxShadow: "4px 4px 0px #FF0055",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.82rem",
            color: "#FFCC00",
            lineHeight: 1.5,
            fontWeight: 700,
          }}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

export function LZChatTab() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiReplies = [
        "Great question! Based on the lecture context, this concept was covered extensively. The professor emphasized the importance of understanding the underlying math rather than just applying formulas mechanically.",
        "⚡ I found a relevant section at around 21:05 where this was discussed in detail. The key takeaway was that these concepts build on each other sequentially.",
        "This is actually a really common point of confusion! The lecture at 33:48 has a great visual explanation that might help clarify things. Want me to point you to a specific timestamp?",
        "According to the lecture transcript, there are 3 key things to remember here: (1) the theoretical foundation, (2) the practical application, and (3) the limitations of the approach. The exam will likely test all three!",
      ];
      const aiMsg: Message = {
        id: messages.length + 2,
        role: "ai",
        text: aiReplies[Math.floor(Math.random() * aiReplies.length)],
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        timestamp: ["21:05", "33:48", "14:50", "27:10"][Math.floor(Math.random() * 4)],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 0 }}>
      {/* Chat messages */}
      <div
        className="flex-1 overflow-y-auto p-4 relative"
        style={{
          backgroundColor: "#FFF9E6",
          minHeight: "300px",
          maxHeight: "420px",
        }}
      >
        {/* Halftone bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <div className="relative z-10">
          {messages.map((msg) =>
            msg.role === "ai" ? (
              <ChatBubbleAI key={msg.id} message={msg} />
            ) : (
              <ChatBubbleUser key={msg.id} message={msg} />
            )
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-2 mb-4">
              <div
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                style={{
                  backgroundColor: "#00F0FF",
                  border: "3px solid #000",
                  boxShadow: "2px 2px 0px #000",
                }}
              >
                <Bot size={14} strokeWidth={3} color="#000" />
              </div>
              <div
                className="flex items-center gap-1 px-4 py-3"
                style={{
                  backgroundColor: "#fff",
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0px #000",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#00F0FF",
                      border: "1.5px solid #000",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggested questions */}
      <div
        className="flex flex-wrap gap-1.5 px-4 py-2"
        style={{ borderTop: "3px solid #000", backgroundColor: "#fff" }}
      >
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
            className="px-2 py-1 cursor-pointer transition-all duration-100 text-xs"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.62rem",
              backgroundColor: "#FFF9E6",
              border: "2px solid #000",
              boxShadow: "2px 2px 0px #000",
              color: "#000",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00F0FF";
              (e.currentTarget as HTMLButtonElement).style.transform = "translate(-1px,-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px #000";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFF9E6";
              (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0px #000";
            }}
          >
            ⚡ {q}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div
        className="flex items-stretch gap-0"
        style={{ borderTop: "4px solid #000" }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask anything about this lecture..."
          className="flex-1 px-4 py-3 outline-none"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.82rem",
            backgroundColor: "#fff",
            border: "none",
            borderRight: "4px solid #000",
            color: "#000",
          }}
        />
        <button
          onClick={() => sendMessage()}
          className="flex items-center gap-2 px-4 py-3 cursor-pointer transition-all duration-100 uppercase"
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "1rem",
            letterSpacing: "0.08em",
            backgroundColor: "#FFCC00",
            color: "#000",
            border: "none",
            borderLeft: "0",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#000";
            (e.currentTarget as HTMLButtonElement).style.color = "#FFCC00";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFCC00";
            (e.currentTarget as HTMLButtonElement).style.color = "#000";
          }}
        >
          <Send size={14} strokeWidth={3} />
          Zap!
        </button>
      </div>
    </div>
  );
}
