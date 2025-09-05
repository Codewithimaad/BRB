import { useEffect, useState } from "react";

const ModernShadowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-100 ease-linear"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* The main cursor dot */}
      <div
        className="hidden md:block w-4 h-4 bg-green-500 rounded-full"
        style={{
          boxShadow: `
            0 1px 2px rgba(0, 255, 0, 0.07),
            0 2px 4px rgba(0, 255, 0, 0.07),
            0 4px 8px rgba(0, 255, 0, 0.07),
            0 8px 16px rgba(0, 255, 0, 0.07),
            0 16px 32px rgba(0, 255, 0, 0.07),
            0 32px 64px rgba(0, 255, 0, 0.07)
          `,
        }}
      ></div>

      {/* A subtle glow effect */}
      <div className="absolute inset-0 w-6 h-6 bg-green-400 rounded-full animate-pulse opacity-25 blur-sm"></div>
    </div>
  );
};

export default ModernShadowCursor;