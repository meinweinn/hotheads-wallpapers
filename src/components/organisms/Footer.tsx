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
      className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-custom-light-gray-2 bg-custom-black/90 shadow-[0_0_0_rgba(255,186,33,0)] transition-all duration-200 hover:-translate-y-1 hover:border-custom-yellow hover:shadow-[0_0_14px_rgba(255,186,33,0.45)]"
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
    >
      <span className="absolute inset-[5px] rounded-xl border border-custom-mid-gray transition-colors duration-200 group-hover:border-custom-yellow/70" />
      <Image src={src} alt={alt} width={26} height={26} className="relative z-10" />
    </motion.a>
  );
};

const Footer: FC = () => {
  return (
    <motion.footer
      className="px-8 py-4 lg:pb-0 abolute bottom-0 bg-transparent w-screen"
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
            src="/images/discord-mark.svg"
            alt="Discord"
          />
          <SocialLink href="https://x.com/HotHeadsNFT" src="/images/x-logo.svg" alt="X" />
          <SocialLink
            href="https://magiceden.io/"
            src="/images/magiceden-mark.svg"
            alt="Magic Eden"
          />
        </div>
        <div className="hidden md:block md:w-1/3" />
      </div>
    </motion.footer>
  );
};

export default Footer;
