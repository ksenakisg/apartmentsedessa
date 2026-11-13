"use client";

export const BackgroundGlow = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Warm Glowing Orb 1 */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "rgba(201, 123, 81, 0.25)",
          filter: "blur(100px)",
          animation: "glowPulse 8s ease-in-out infinite alternate",
        }}
      />

      {/* Warm Glowing Orb 2 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "-10%",
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          background: "rgba(140, 122, 107, 0.25)",
          filter: "blur(120px)",
          animation:
            "glowPulse 12s ease-in-out infinite alternate-reverse",
        }}
      />

      <style>{`
        @keyframes glowPulse {
          0% { transform: scale(1) translate(0, 0); opacity: 0.5; }
          100% { transform: scale(1.3) translate(40px, -30px); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
};

