"use client";

import { usePathname, useRouter } from "next/navigation";
import { MessageSquarePlus } from "lucide-react";

export function FloatingFeedbackBubble() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClickBubble = () => {
    if (pathname === "/contact") {
      // If already on contact page, switch tab to feedback and scroll down to form
      window.dispatchEvent(new CustomEvent("switch-contact-tab", { detail: "feedback" }));
      const el = document.getElementById("form-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate directly to contact page feedback tab & form
      router.push("/contact?type=feedback#form-section");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <button
        onClick={handleClickBubble}
        aria-label="Submit Feedback"
        className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-red-600/40 border border-red-500/50 backdrop-blur-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Subtle pulse ring around bubble */}
        <span className="absolute -inset-1 rounded-full bg-red-600/30 animate-ping pointer-events-none opacity-40" />

        <div className="relative p-1 rounded-full bg-white/20">
          <MessageSquarePlus className="w-5 h-5 text-white" />
        </div>

        <span className="font-mono tracking-wider uppercase font-extrabold hidden sm:inline-block">
          Feedback
        </span>
        <span className="sm:hidden font-mono font-bold">Feedback</span>

        <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>
    </div>
  );
}
