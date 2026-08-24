"use client";

export const BackgroundRipples = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
      <div className="absolute top-[20%] left-[15%] w-32 h-32 border border-[#C97B51]/25 rounded-full animate-ripple" />
      <div className="absolute top-[60%] right-[15%] w-48 h-48 border border-[#8C7A6B]/20 rounded-full animate-ripple-delayed" />
      <div className="absolute top-[40%] left-[60%] w-24 h-24 border border-[#C97B51]/20 rounded-full animate-ripple-slow" />

      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(0.4);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 10s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .animate-ripple-delayed {
          animation: ripple 12s cubic-bezier(0, 0.2, 0.8, 1) infinite 3s;
        }
        .animate-ripple-slow {
          animation: ripple 14s cubic-bezier(0, 0.2, 0.8, 1) infinite 6s;
        }
      `}</style>
    </div>
  );
};

