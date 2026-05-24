import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], .cursor-pointer, .wallet-adapter-button, [data-cursor='hover']";
const NATIVE_CURSOR_SELECTOR =
  "input, textarea, select, .wallet-adapter-modal, .wallet-adapter-modal *";

const CustomCursor: FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [useNativeCursor, setUseNativeCursor] = useState<boolean>(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    setEnabled(finePointer.matches);

    const handlePointerChange = (event: MediaQueryListEvent) => {
      setEnabled(event.matches);
    };

    finePointer.addEventListener("change", handlePointerChange);

    return () => {
      finePointer.removeEventListener("change", handlePointerChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-enabled");
      document.documentElement.classList.remove("custom-cursor-enabled");
      return;
    }

    document.body.classList.add("custom-cursor-enabled");
    document.documentElement.classList.add("custom-cursor-enabled");

    const handlePointerMove = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Element | null;
      const shouldUseNativeCursor = Boolean(target?.closest(NATIVE_CURSOR_SELECTOR));
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
      setUseNativeCursor(shouldUseNativeCursor);
      setIsHovering(
        !shouldUseNativeCursor && Boolean(target?.closest(INTERACTIVE_SELECTOR))
      );
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
      setUseNativeCursor(false);
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled]);

  const shouldShowCustomCursor = isVisible && !useNativeCursor;

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-custom-yellow shadow-[0_0_10px_rgba(255,186,33,0.75)]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: shouldShowCustomCursor ? 1 : 0,
          scale: 1,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 34, mass: 0.2 }}
      />
      <motion.div
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-[#ff3d9a]/80 shadow-[0_0_16px_rgba(255,61,154,0.28)]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          opacity: shouldShowCustomCursor ? 1 : 0,
          scale: isHovering ? 1.2 : 1,
          borderColor: isHovering
            ? "rgba(255,186,33,0.95)"
            : "rgba(255,61,154,0.78)",
          boxShadow: isHovering
            ? "0 0 24px rgba(255,186,33,0.36)"
            : "0 0 16px rgba(255,61,154,0.28)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.35 }}
      />
    </div>
  );
};

export default CustomCursor;