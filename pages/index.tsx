import { PageHead } from "@components";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { midEnterAnimation } from "@constants";
import { MouseEvent, useState } from "react";

const Home: NextPage = () => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 2;
    const y = (event.clientY / innerHeight - 0.5) * 2;

    setParallax({ x, y });
  };

  return (
    <>
      <PageHead title="Hot Heads" description="Welcome to the Underworld" />
      <motion.div
        className="relative h-screen w-screen overflow-hidden bg-custom-black"
        onMouseMove={handleMouseMove}
        {...midEnterAnimation}
      >
        <motion.div
          className="absolute inset-[-18px]"
          animate={{
            x: parallax.x * -18,
            y: parallax.y * -10,
          }}
          transition={{ type: "spring", stiffness: 55, damping: 22, mass: 0.5 }}
        >
          <Image
            src="/images/website-gif.gif"
            alt=""
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(255,0,120,0.18),transparent_34%),linear-gradient(90deg,rgba(3,12,18,0.86)_0%,rgba(3,12,18,0.46)_42%,rgba(3,12,18,0.2)_100%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:100%_4px]" />
        <div className="landing-flicker absolute inset-x-0 top-0 h-[34vh] bg-gradient-to-b from-black/70 via-black/22 to-transparent" />
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
              className="group relative inline-flex h-[58px] min-w-[188px] items-center justify-center overflow-hidden border-2 border-[#ffba21] bg-[#080808]/75 px-8 text-xs uppercase tracking-[0.24em] text-[#ffba21] shadow-[0_0_22px_rgba(255,0,120,0.34)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff3d9a] hover:text-white hover:shadow-[0_0_30px_rgba(255,61,154,0.62)]"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-white/50" />
              <span className="absolute inset-y-0 left-0 w-1 bg-[#ff3d9a] opacity-80 transition-all duration-200 group-hover:w-full group-hover:opacity-10" />
              <span className="relative">Enter</span>
            </Link>
          </motion.div>
          <div className="h-10 w-full md:h-16" />
        </div>
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
        `}</style>
      </motion.div>
    </>
  );
};

export default Home;
