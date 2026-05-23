import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { midEnterAnimation } from "@constants";

interface SocialLinkProps {
  href: string;
  src: string;
  alt: string;
}

const SocialLink: FC<SocialLinkProps> = ({ href, src, alt }) => {
  return (
    <motion.a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="pointer-events-auto flex h-12 w-12 items-center justify-center transition-all duration-200 hover:-translate-y-1"
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
    >
      <Image
        src={src}
        alt={alt}
        width={34}
        height={34}
        className="transition-all duration-200 hover:drop-shadow-[0_0_12px_rgba(255,186,33,0.65)] hover:saturate-150"
      />
    </motion.a>
  );
};

const Footer: FC = () => {
  return (
    <motion.footer
      className="pointer-events-none px-8 py-4 lg:pb-0 abolute bottom-0 bg-transparent w-screen"
      {...midEnterAnimation}
    >
      <div className="flex flex-col md:flex-row items-center gap-4">
        <motion.div
          className="md:w-1/3"
          // {...midEnterAnimation}
        >
          <Image
            src="/images/logo_base.png"
            width={3992 / 26}
            height={1560 / 26}
            alt="Logo"
          />
        </motion.div>
        <div className="md:w-1/3 flex flex-row items-center justify-center text-xs gap-4 lg:gap-6 font-daysOne text-gray-300">
          <SocialLink
            href="https://discord.gg/FhuqPwXmER"
            src="/images/logo-discord.png"
            alt="Discord"
          />
          <SocialLink href="https://x.com/HotHeadsNFT" src="/images/logo-x.png" alt="X" />
          <SocialLink
            href="https://magiceden.io/tr/marketplace/hot_heads"
            src="/images/logo-me.png"
            alt="Magic Eden"
          />
        </div>
        <div className="hidden md:block md:w-1/3" />
      </div>
    </motion.footer>
  );
};

export default Footer;
