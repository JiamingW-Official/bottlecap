"use client"

export default function HeroFallback() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #FFF0EB 0%, #FAFAF8 40%, #F5F5F0 70%, #FFF0EB 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
        }}
      />

      {/* Floating circles */}
      {[
        { size: 120, x: "10%", y: "20%", delay: 0, color: "rgba(255,107,53,0.08)" },
        { size: 80, x: "70%", y: "15%", delay: 1.5, color: "rgba(255,107,53,0.06)" },
        { size: 60, x: "85%", y: "60%", delay: 3, color: "rgba(255,159,28,0.07)" },
        { size: 100, x: "25%", y: "70%", delay: 2, color: "rgba(255,107,53,0.05)" },
        { size: 40, x: "55%", y: "40%", delay: 4, color: "rgba(255,107,53,0.08)" },
      ].map((circle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            left: circle.x,
            top: circle.y,
            backgroundColor: circle.color,
            animation: `floatCircle 6s ease-in-out ${circle.delay}s infinite`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes floatCircle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  )
}
