import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { midEnterAnimation } from "@constants";
import Link from "next/link";

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
        <div className="md:w-1/3 flex flex-row items-center justify-center text-xs gap-4 lg:gap-8 font-daysOne text-gray-300">
          <div className="cursor-pointer ">
            {" "}
            <a
              href="https://discord.gg/FhuqPwXmER"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src="/images/logo-discord.png"
                alt="Discord"
                width={288 / 7}
                height={189 / 7}
                className="transition-opacity duration-300 "
              />
            </a>
          </div>
          <div className="cursor-pointer">
            <a
              href="https://x.com/HotHeadsNFT"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src="/images/x-logo.svg"
                alt="X"
                width={32}
                height={32}
                className="transition-opacity duration-300 "
              />
            </a>
          </div>
          <div className="hidden md:block cursor-pointer">
            <Link href="/about">
              <Image
                src="/images/logo-about.png"
                alt="About"
                width={216 / 7}
                height={240 / 7}
                className="transition-opacity duration-300 "
              />
            </Link>
          </div>
          <div className="hidden md:block cursor-pointer">
            <Link href="/inventory">
              <Image
                src="/images/logo-inventory.png"
                alt="Inventory"
                width={216 / 7}
                height={189 / 7}
                className="transition-opacity duration-300 "
              />
            </Link>
          </div>
        </div>
        <div className="hidden md:block md:w-1/3" />
      </div>
    </motion.footer>
  );
};

export default Footer;
