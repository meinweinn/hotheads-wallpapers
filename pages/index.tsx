import { PageHead } from "@components";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { midEnterAnimation } from "@constants";
import { MouseEvent, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0, isVisible: false });
  const [gifLoaded, setGifLoaded] = useState<boolean>(false);
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 2;
    const y = (event.clientY / innerHeight - 0.5) * 2;

    setParallax({ x, y });
    setCursor({ x: event.clientX, y: event.clientY, isVisible: true });
  };

  const handleEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsEntering(true);
    window.setTimeout(() => {
      router.push("/about");
    }, 260);
  };

  return (
    <>
      <PageHead title="Hot Heads" description="Welcome to the Underworld" />
      <motion.div
        className="relative h-screen w-screen overflow-hidden bg-custom-black"
        onMouseMove={handleMouseMove}
        onMouseLeave={() =>
          setCursor((currentCursor) => ({ ...currentCursor, isVisible: false }))
        }
        {...midEnterAnimation}
      >
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[6] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,61,154,0.42)_0%,rgba(255,87,34,0.22)_34%,rgba(33,212,255,0.12)_52%,transparent_72%)] blur-2xl mix-blend-screen"
          animate={{
            x: cursor.x - 210,
            y: cursor.y - 210,
            opacity: cursor.isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 24, mass: 0.35 }}
        />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.16),transparent_42%),linear-gradient(135deg,#07131d_0%,#120711_55%,#090909_100%)]" />
        <motion.div
          className="absolute inset-[-18px] z-[1]"
          initial={{ opacity: 0 }}
          animate={{
            x: parallax.x * -18,
            y: parallax.y * -10,
            opacity: gifLoaded ? 1 : 0,
          }}
          transition={{
            x: { type: "spring", stiffness: 55, damping: 22, mass: 0.5 },
            y: { type: "spring", stiffness: 55, damping: 22, mass: 0.5 },
            opacity: { duration: 0.6, ease: "easeOut" },
          }}
        >
          <Image
            src="/images/website-gif.gif"
            alt=""
            fill
            unoptimized
            priority
            className="object-cover"
            onLoadingComplete={() => setGifLoaded(true)}
          />
        </motion.div>
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_72%_42%,rgba(255,0,120,0.18),transparent_34%),linear-gradient(90deg,rgba(3,12,18,0.86)_0%,rgba(3,12,18,0.46)_42%,rgba(3,12,18,0.2)_100%)]" />
        <div className="absolute inset-0 z-[4] opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:100%_4px]" />
        <div className="landing-flicker absolute inset-x-0 top-0 z-[5] h-[34vh] bg-gradient-to-b from-black/70 via-black/22 to-transparent" />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-6 py-10 md:px-12 md:py-12">
          <div className="w-full" />
          <motion.div
            className="flex w-full flex-col items-center gap-8 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <motion.div
              className="relative w-[300px] max-w-[86vw] md:w-[470px] drop-shadow-[0_0_28px_rgba(255,87,34,0.65)]"
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/logo_base.png"
                width={3992 / 8}
                height={1560 / 8}
                alt="Hot Heads"
                priority
              />
            </motion.div>
            <Link
              href="/about"
              aria-label="Enter Hot Heads"
              onClick={handleEnter}
              className="landing-enter group relative inline-flex h-[58px] min-w-[188px] items-center justify-center overflow-hidden border-2 border-[#ffba21] bg-[#080808]/75 px-8 text-xs uppercase tracking-[0.24em] text-[#ffba21] shadow-[0_0_22px_rgba(255,0,120,0.34)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff3d9a] hover:text-white hover:shadow-[0_0_30px_rgba(255,61,154,0.62)]"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-white/50" />
              <span className="absolute inset-y-0 left-0 w-1 bg-[#ff3d9a] opacity-80 transition-all duration-200 group-hover:w-full group-hover:opacity-10" />
              <span className="landing-enter-text relative">Enter</span>
            </Link>
          </motion.div>
          <div className="h-10 w-full md:h-16" />
        </div>
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isEntering ? [0, 0.22, 0.08, 1] : 0 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
        />
        <style jsx>{`
          .landing-flicker {
            animation: landing-flicker 7.5s infinite;
            pointer-events: none;
          }

          @keyframes landing-flicker {
            0%,
            18%,
            22%,
            52%,
            58%,
            100% {
              opacity: 0;
              transform: translateY(-18%);
            }

            19% {
              opacity: 0.26;
              transform: translateY(-8%);
            }

            20% {
              opacity: 0.08;
              transform: translateY(-5%);
            }

            53% {
              opacity: 0.18;
              transform: translateY(-2%);
            }

            55% {
              opacity: 0.34;
              transform: translateY(0%);
            }
          }

          .landing-enter:hover .landing-enter-text {
            animation: enter-glitch 0.42s steps(2, end);
          }

          .landing-enter:hover::before,
          .landing-enter:hover::after {
            content: "Enter";
            position: absolute;
            color: #fff;
            opacity: 0.75;
            pointer-events: none;
          }

          .landing-enter:hover::before {
            transform: translate(-3px, -1px);
            color: #ff3d9a;
            animation: enter-glitch-before 0.42s steps(2, end);
          }

          .landing-enter:hover::after {
            transform: translate(3px, 1px);
            color: #21d4ff;
            animation: enter-glitch-after 0.42s steps(2, end);
          }

          @keyframes enter-glitch {
            0%,
            100% {
              transform: translateX(0);
            }
            28% {
              transform: translateX(-2px);
            }
            54% {
              transform: translateX(3px);
            }
            76% {
              transform: translateX(-1px);
            }
          }

          @keyframes enter-glitch-before {
            0%,
            100% {
              clip-path: inset(0 0 0 0);
            }
            35% {
              clip-path: inset(0 0 58% 0);
            }
            65% {
              clip-path: inset(48% 0 0 0);
            }
          }

          @keyframes enter-glitch-after {
            0%,
            100% {
              clip-path: inset(0 0 0 0);
            }
            35% {
              clip-path: inset(52% 0 0 0);
            }
            65% {
              clip-path: inset(0 0 54% 0);
            }
          }
        `}</style>
      </motion.div>
    </>
  );
};

export default Home;
