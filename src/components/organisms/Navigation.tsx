import { FC, useEffect, useState } from "react";
import { Logo, MenuIcon, NavItem, Menu, MenuCloseIcon } from "@components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnimatePresence, motion } from "framer-motion";
import { fastExitAnimation } from "@constants";
import { useWallet } from "@solana/wallet-adapter-react";

const Navigation: FC = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { publicKey } = useWallet();

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <header className="">
      {didMount && (
        <>
          {/* lg + screens */}
          <div className="hidden lg:block fixed left-0 3xl:-top-[14%] h-full lg:w-60 2xl:w-[20%] 3xl:w-[18%]">
            <motion.div className="left-8 top-5 fixed">
              <Logo />
            </motion.div>
            <motion.div className="flex flex-col items-center justify-center h-full pb-10">
              <div className="flex flex-col items-center justify-center  pt-4 h-full text-base 2xl:text-xl uppercase font-primary">
                <NavItem href="/about">About</NavItem>
                <NavItem href="/gallery">Gallery</NavItem>
                <NavItem href="/inventory">Inventory</NavItem>
                <NavItem href="/network" featured={true}>
                  Network
                </NavItem>
                <NavItem href="/merch" disabled={true}>
                  Merch
                </NavItem>
                <NavItem href="/faq">FAQ</NavItem>
              </div>
            </motion.div>
          </div>
          {/* md - screens */}
          <div className="lg:hidden flex justify-between px-4 md:px-8 py-2 relative">
            <Logo />
            <AnimatePresence mode="wait">
              {!openMenu ? (
                <motion.div
                  key="menu-icon"
                  onClick={() => setOpenMenu(true)}
                  {...fastExitAnimation}
                >
                  <MenuIcon />
                </motion.div>
              ) : (
                <motion.div
                  onClick={() => setOpenMenu(false)}
                  className="cursor-pointer z-[100]"
                  {...fastExitAnimation}
                >
                  <MenuCloseIcon />
                </motion.div>
              )}
            </AnimatePresence>

            <Menu toggleMenu={setOpenMenu} open={openMenu} />
          </div>
          {/* {router.asPath === "/inventory" && ( */}
          <motion.div
            className="absolute md:fixed left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0 top-5 md:right-28 lg:right-10 z-0"
            // {...enterAnimation}
          >
            <WalletMultiButton
              startIcon={undefined}
              className="bg-button bg-cover !w-[171.5px] !h-[56px] !font-primary !text-xs hover:!bg-yellow-400 text-center !flex !justify-center
              transition-all duration-200 opacity-70 hover:opacity-100 uppercase"
            >
              {publicKey
                ? publicKey.toBase58().slice(0, 4) +
                  ".." +
                  publicKey.toBase58().slice(-4)
                : "Connect"}
            </WalletMultiButton>
          </motion.div>
          {/* )} */}
        </>
      )}
    </header>
  );
};

export default Navigation;
