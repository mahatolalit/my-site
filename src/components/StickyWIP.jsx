// StickyWIP.jsx
// A single-file React component (default export) that you can drop into a Vite + React + Tailwind project.
// Usage: import StickyWIP from './StickyWIP'; then place <StickyWIP /> near the top of your App or Layout.

import React, { useEffect, useState } from 'react';

export default function StickyWIP() {
  // Dismiss logic: clicking X stores a timestamp; it will reappear after `reappearAfterMs`.
  const storageKey = 'sticky-wip-dismissed-at';
  const reappearAfterMs = 1000 * 60 * 30; // 30 minutes (change to your liking)

  const [hidden, setHidden] = useState(() => {
    try {
      const ts = localStorage.getItem(storageKey);
      if (!ts) return false;
      return Date.now() - Number(ts) < reappearAfterMs;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    // keep hidden state in sync if user opens in another tab
    function onStorage(e) {
      if (e.key === storageKey) {
        const ts = e.newValue;
        if (!ts) setHidden(false);
        else setHidden(Date.now() - Number(ts) < reappearAfterMs);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch (e) {}
    setHidden(true);
  }

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[9999] flex justify-center px-4">
      {/* container is pointer-events-none so background doesn't block clicks; inner panel re-enables pointer events */}
      <div className="pointer-events-auto relative max-w-[880px] w-full">
        {/* ambient glow layer */}
        <div
          aria-hidden
          className="absolute -inset-6 rounded-xl blur-3xl opacity-60 animate-pulse-slow"
          style={{
            background: 'linear-gradient(90deg, rgba(255,115,115,0.25), rgba(255,210,64,0.18), rgba(126,239,255,0.18))',
            filter: 'blur(30px) saturate(120%)',
            zIndex: -1,
          }}
        />

        {/* notification panel */}
        <div
          role="status"
          aria-live="polite"
          className="group relative mx-auto rounded-xl bg-white/30 border border-white/20 shadow-2xl shadow-black/30 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-gray-900 flex items-center gap-3 transform transition-transform will-change-transform "
          style={{
            // tiny floating animation via inline style (Tailwind handles most)
            animation: 'slideDown 550ms cubic-bezier(.22,.9,.26,1), floaty 4s ease-in-out infinite',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-600/90 text-white font-semibold shrink-0 animate-pulse-fast">
              WIP
            </div>
            <div>
              <div className="font-semibold">This website is currently <span className="italic">WIP</span></div>
              <div className="text-xs text-gray-600">Expect frequent changes, broken links and bad jokes.</div>
            </div>
          </div>

          {/* spacer */}
          <div className="flex-1" />

          {/* actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // example: open /wip-info or external changelog
                window.location.href = '/wip';
              }}
              className="px-3 py-1 rounded-md text-sm font-medium border border-transparent bg-white/60 hover:bg-white/80 shadow-sm"
              aria-label="Learn more about WIP"
            >
              Learn
            </button>

            <button
              onClick={dismiss}
              aria-label="Dismiss WIP notice"
              className="-mr-2 rounded-full p-1 opacity-80 hover:opacity-100 focus:outline-none"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* local style for keyframes and small custom utilities */}
      <style>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-8px) scale(0.995); }
          60% { opacity: 1; transform: translateY(0) scale(1.0); }
          100% { opacity: 1; transform: translateY(0) scale(1.0); }
        }
        @keyframes floaty {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulseFast {
          0% { transform: scale(1) }
          50% { transform: scale(1.06) }
          100% { transform: scale(1) }
        }
        .animate-pulse-fast { animation: pulseFast 1.6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseFast 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/*
Notes & customization:
- Drop this file into src/components/StickyWIP.jsx and `import StickyWIP from './components/StickyWIP'` in your layout/App.
- Tailwind utilities are used everywhere; no additional CSS files required.
- Change `reappearAfterMs` if you want it more/less annoying.
- Tweak gradient, blur, and timing to get irresistibly obnoxious glow.
- If you use plain HTML (no React), port the markup & styles and use a small script to manage localStorage.
*/
