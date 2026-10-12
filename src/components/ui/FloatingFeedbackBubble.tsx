"use client";

import { usePathname, useRouter } from "next/navigation";
import { MessageSquarePlus, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingFeedbackBubble() {
  const pathname = usePathname();
  const router = useRouter();
  const [bubbleVisible, setBubbleVisible] = useState(false);

  // Show the bubble on every page load / route change
  useEffect(() => {
    setBubbleVisible(false);
    const timer = setTimeout(() => setBubbleVisible(true), 2500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClickBubble = () => {
    setBubbleVisible(false);
    if (pathname === "/contact") {
      window.dispatchEvent(new CustomEvent("switch-contact-tab", { detail: "feedback" }));
      const el = document.getElementById("form-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact?type=feedback#form-section");
    }
  };

  const handleToggleBubble = () => setBubbleVisible((prev) => !prev);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBubbleVisible(false);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes ping-slow {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes bubble-in {
          0%   { opacity: 0; transform: translateY(10px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .fb-float  { animation: float     3.2s ease-in-out infinite; }
        .fb-ping   { animation: ping-slow 2s   ease-out  infinite;  }
        .fb-in     { animation: bubble-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .fb-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% auto;
          animation: shimmer 2.4s linear infinite;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* ── Message Bubble ── */}
        {bubbleVisible && (
          <div
            className="fb-in relative w-[220px] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl shadow-black/20 dark:shadow-black/60 border border-slate-100 dark:border-slate-700/80 overflow-hidden"
            role="dialog"
            aria-label="Talk to us"
          >

            <div className="p-3.5">
              {/* Dismiss */}
              <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="absolute top-2.5 right-2.5 rounded-full w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>

              {/* Message */}
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-0.5 pr-5">
                Got something to say? 👋
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                We&apos;d love to hear from you.
              </p>

              {/* CTA */}
              <button
                id="feedback-bubble-cta"
                onClick={handleClickBubble}
                className="group relative w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs text-white overflow-hidden transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #c2410c 100%)",
                  boxShadow: "0 4px 14px rgba(220, 38, 38, 0.4)",
                }}
              >
                <span className="fb-shimmer absolute inset-0 pointer-events-none" />
                <MessageSquarePlus className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Talk To Us</span>
                <ArrowRight className="w-3 h-3 relative z-10 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Speech bubble tail */}
            <div
              className="absolute -bottom-2 right-5 w-4 h-4 bg-white dark:bg-slate-900 border-r border-b border-slate-100 dark:border-slate-700/80 rotate-45"
              aria-hidden="true"
            />
          </div>
        )}

        {/* ── FAB ── */}
        <div className="relative">
          {/* Always-on pulse ring */}
          <span
            className="fb-ping absolute inset-0 rounded-full bg-red-500/40 pointer-events-none"
            aria-hidden="true"
          />

          <button
            id="feedback-bubble-trigger"
            onClick={handleToggleBubble}
            aria-label="Talk to us"
            aria-expanded={bubbleVisible}
            aria-haspopup="dialog"
            title="Talk to us"
            className="fb-float relative flex h-14 w-14 items-center justify-center rounded-full text-white cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50"
            style={{
              background: bubbleVisible
                ? "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)"
                : "linear-gradient(135deg, #ef4444 0%, #dc2626 40%, #b91c1c 100%)",
              boxShadow: bubbleVisible
                ? "0 8px 28px rgba(185,28,28,0.55), 0 2px 8px rgba(0,0,0,0.25)"
                : "0 8px 32px rgba(220,38,38,0.5), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            {bubbleVisible
              ? <X className="h-5 w-5" />
              : <MessageSquarePlus className="h-5 w-5" />
            }
          </button>
        </div>

      </div>
    </>
  );
}
