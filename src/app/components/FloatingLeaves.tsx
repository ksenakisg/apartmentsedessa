"use client";

export const FloatingLeaves = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
      {/* Leaf 1 - Left Drift */}
      <div
        className="absolute -top-10 left-[10%] text-[#C97B51] opacity-30"
        style={{ animation: "leafFall 18s linear infinite" }}
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4l-.5 1.6 2-.5c1.2.3 2.6.5 4 1.5 1.4-1 2.8-1.2 4-1.5l2 .5-.5-1.6C20.2 18.6 22 15.5 22 12c0-5.5-4.5-10-10-10zm0 18c-1.2 0-2.3-.2-3.4-.6l-.6-.2-.3.8-.5.1.2-.8-.4-.4C4.6 17.5 3.5 14.9 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5c0 2.9-1.1 5.5-3.5 6.9l-.4.4.2.8-.5-.1-.3-.8-.6.2c-1.1.4-2.2.6-3.4.6z" />
          <path
            d="M12 7c-1.2 1.3-2.2 3.2-2.2 5.2 0 2.6 1.1 4.2 2.2 5.1 1.1-.9 2.2-2.5 2.2-5.1 0-2-1-3.9-2.2-5.2z"
            opacity="0.45"
          />
        </svg>
      </div>

      {/* Leaf 2 - Right Drift */}
      <div
        className="absolute -top-10 left-[75%] text-[#8C7A6B] opacity-25"
        style={{ animation: "leafFall 24s linear infinite 5s" }}
      >
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.8 2.8C11.4 5.6 7.7 11.2 7 18c-2.3-2.1-3.5-5.2-3-8.3C4.5 6.2 8.3 3.5 12.8 3c1.7-.2 3.4-.3 5-2zm-2.3 18.2c-.7-2.6-2.2-5-4.3-6.8-2.1-1.8-4.7-2.8-7.4-2.8 1.8 3.8 5.2 6.6 9.4 7.6 1.1.2 2.3 0 2.3 0z" />
        </svg>
      </div>

      {/* Leaf 3 - Mid Drift */}
      <div
        className="absolute -top-10 left-[45%] text-[#C97B51] opacity-20"
        style={{ animation: "leafFall 22s linear infinite 10s" }}
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4l-.5 1.6 2-.5c1.2.3 2.6.5 4 1.5 1.4-1 2.8-1.2 4-1.5l2 .5-.5-1.6C20.2 18.6 22 15.5 22 12c0-5.5-4.5-10-10-10z" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes leafFall {
          0% {
            transform: translateY(-5vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

