"use client";
import FooterSection from "@/components/FooterSection";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import Navbar from "@/components/Navbar";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Dynamically adjust textarea height based on typing
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 130)}px`;
    }
  }, [input]);

  // Client-side rate-limiting helper (Limit: 5 questions per 60 seconds)
  const checkClientRateLimit = (): boolean => {
    const WINDOW_MS = 60 * 1000; // 1 minute window
    const MAX_REQUESTS = 5; // Max 5 messages
    const now = Date.now();

    try {
      const timestampsStr = localStorage.getItem("chat_rate_limit_timestamps");
      let timestamps: number[] = timestampsStr ? JSON.parse(timestampsStr) : [];

      // Remove timestamps that are outside the 1-minute window
      timestamps = timestamps.filter((t) => now - t < WINDOW_MS);

      if (timestamps.length >= MAX_REQUESTS) {
        return false;
      }

      // Add current timestamp and update storage
      timestamps.push(now);
      localStorage.setItem(
        "chat_rate_limit_timestamps",
        JSON.stringify(timestamps),
      );
      return true;
    } catch (e) {
      // Fallback if local storage is disabled in user browser
      return true;
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = input.trim();
    if (!cleanInput || loading) return;

    setUiError(null);

    // Apply Client-Side Rate Limit Verification
    if (!checkClientRateLimit()) {
      setUiError(
        "অতিরিক্ত ট্রাফিকের চাপ এড়াতে প্রতি মিনিটে সর্বোচ্চ ৫টি প্রশ্ন করা যাবে। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।",
      );
      return;
    }

    setInput("");
    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: cleanInput },
    ];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/class-9-10-bangla-sohopath-chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: cleanInput,
          history: messages,
        }),
      });
      const data = await response.json();

      if (response.ok && data.answer) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
      } else {
        console.error(
          "Server API returned an error:",
          data.error || "Unknown response",
        );
        setUiError(
          data.error ||
            "দুঃখিত, সার্ভারের সাথে যোগাযোগ স্থাপন করা সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন।",
        );
      }
    } catch (error) {
      console.error("Network or execution failure:", error);
      setUiError(
        "ইন্টারনেট সংযোগে ত্রুটি অথবা সার্ভার ডাউন রয়েছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setUiError(null);
  };

  return (
    <>
      <Navbar />
      <section className="container mx-auto pt-24 md:pt-32 pb-8 md:pb-20 px-3 sm:px-4 flex flex-col items-center">
        {/* Page Title Header */}
        <div className="text-center mb-5 md:mb-8 w-full max-w-3xl">
          <BlurFade delay={0.25} inView>
            <AuroraText className="text-lg xs:text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight block">
              ৯ম-১০ম শ্রেণীর বাংলা সহপাঠ চ্যাটবট
            </AuroraText>
          </BlurFade>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-3 px-2">
            বাংলা সহপাঠ বইয়ের যেকোনো গল্প, কবিতা, নাটক, চরিত্র বা সৃজনশীল
            প্রশ্নের উত্তরের জন্য নিচের সহকারীকে প্রশ্ন করুন।
          </p>
        </div>

        {/* Responsive Chat Container Card */}
        <div
          className="flex flex-col w-full max-w-4xl
                     h-[min(72dvh,560px)] sm:h-145 md:h-162.5
                     bg-slate-900/40 backdrop-blur-md border border-slate-800
                     rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-sm">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 truncate">
                AI সহকারী
              </span>
            </div>
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                aria-label="নতুন চ্যাট শুরু করুন"
                className="shrink-0 px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-md transition-colors border border-slate-700"
              >
                নতুন চ্যাট
              </button>
            )}
          </div>

          {/* Chat Messaging Box */}
          <section
            className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 space-y-4 bg-slate-900/20 scrollbar-thin scrollbar-thumb-slate-800"
            aria-live="polite"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-950/50 flex items-center justify-center border border-emerald-800/80 shadow-inner">
                  <span className="text-xl sm:text-2xl">🇧🇩</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                  প্রশ্নটি নিচে লিখুন। সম্পূর্ণ উত্তর পেতে উদ্দীপকটি সহ
                  বিস্তারিত লিখে পাঠাতে পারেন।
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[92%] xs:max-w-[90%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 md:p-4 shadow-md leading-relaxed wrap-break-word ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-none"
                        : "bg-slate-800/90 text-slate-100 rounded-bl-none border border-slate-700/50"
                    }`}
                  >
                    <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      {msg.role === "user" ? "আপনি" : "চ্যাটবট"}
                    </div>
                    <div className="text-xs sm:text-sm space-y-2 wrap-anywhere">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => (
                            <p
                              className="mb-1.5 last:mb-0 leading-relaxed"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc pl-4 mb-1.5 space-y-1 text-slate-200"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal pl-4 mb-1.5 space-y-1 text-slate-200"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="text-xs sm:text-sm" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-bold text-yellow-300"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="font-bold text-emerald-400 mt-2 mb-1 text-sm sm:text-base"
                              {...props}
                            />
                          ),
                          table: ({ node, ...props }) => (
                            <div className="overflow-x-auto rounded-lg border border-slate-700/50 my-2">
                              <table
                                className="w-full text-left text-[11px] sm:text-xs"
                                {...props}
                              />
                            </div>
                          ),
                          th: ({ node, ...props }) => (
                            <th
                              className="px-2 py-1 bg-slate-700/50 font-semibold border-b border-slate-600"
                              {...props}
                            />
                          ),
                          td: ({ node, ...props }) => (
                            <td
                              className="px-2 py-1 border-b border-slate-700/50"
                              {...props}
                            />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-emerald-400 underline break-all"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Loading Indicator */}
            {loading && (
              <div
                className="flex justify-start"
                role="status"
                aria-label="চ্যাটবট উত্তর তৈরি করছে"
              >
                <div className="bg-slate-800/90 text-slate-100 rounded-2xl rounded-bl-none border border-slate-700/50 p-3.5 max-w-[80%] shadow-md">
                  <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    চ্যাটবট
                  </div>
                  <div className="flex items-center space-x-1.5 py-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}

            {/* User-facing error message notification */}
            {uiError && (
              <div
                className="p-3 sm:p-3.5 bg-red-950/30 border border-red-900/60 rounded-xl text-xs sm:text-sm text-red-300"
                role="alert"
              >
                <p className="font-semibold mb-1">দুঃখিত, একটি সমস্যা হয়েছে</p>
                <p>{uiError}</p>
              </div>
            )}
            <div ref={chatEndRef} />
          </section>

          {/* Form Footer of Chat Widget */}
          <div className="p-2.5 sm:p-3 md:p-4 bg-slate-950/80 border-t border-slate-800/80">
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                className="flex-1 min-w-0 bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 md:py-3 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-white placeholder-slate-500 transition-all resize-none min-h-11 overflow-y-auto scrollbar-thin"
                placeholder="আপনার প্রশ্নটি এখানে লিখুন..."
                aria-label="আপনার প্রশ্ন লিখুন"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="প্রশ্ন পাঠান"
                className="shrink-0 px-4 md:px-6 py-2.5 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-xs sm:text-sm disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-emerald-900/20 h-11 flex items-center justify-center whitespace-nowrap"
              >
                পাঠান
              </button>
            </form>
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  );
}
