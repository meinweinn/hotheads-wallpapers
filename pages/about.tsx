import { PageLayout, TabBar, ScrollItem, ListItem } from "@components";
import { useState } from "react";
import { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { midExitAnimation } from "@constants";
import Image from "next/image";

const About: NextPage = () => {
  const [tabId, setTabId] = useState<number>(0);

  const tabs: string[] = ["info", "lore"];

  const handleTabChange = (tab: number) => {
    setTabId(tab);
  };

  return (
    <PageLayout header="About">
      <div className="w-full h-full md:px-8 flex flex-col items-center gap-10 lg:gap-5 pt-5">
        <TabBar tabs={tabs} handleTabChange={handleTabChange} />
        <div className="container overflow-y-hidden lg:overflow-y-auto overflow-x-hidden h-full">
          <AnimatePresence mode="wait">
            {tabId === 0 ? (
              <motion.div
                className="h-full flex flex-col gap-6 px-2 md:px-10 pt-8 pb-10"
                {...midExitAnimation}
                key="info"
              >
                <ScrollItem key="info-hero" enableY={true} duration={0.8}>
                  <div className="relative overflow-hidden rounded-[8px] border border-custom-yellow/20 bg-[#070809]/80 px-5 py-5 shadow-[0_0_32px_rgba(255,87,34,0.10)] md:px-7">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,186,33,0.16),transparent_34%),linear-gradient(90deg,rgba(255,61,154,0.08),transparent_42%)]" />
                    <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="font-primary text-[9px] uppercase tracking-[0.24em] text-custom-yellow">
                          Underworld Registry
                        </p>
                        <h2 className="mt-3 text-2xl leading-tight text-white md:text-3xl">
                          100 one-of-one Hot Heads on Solana.
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center font-primary text-[9px] uppercase text-custom-yellow md:min-w-[190px]">
                        <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
                          Supply
                          <p className="pt-1 text-white">100</p>
                        </div>
                        <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
                          Chain
                          <p className="pt-1 text-white">Solana</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollItem>
                <div className="grid gap-4 md:grid-cols-2">
                  <ScrollItem key="info-1" enableY={true} duration={0.8}>
                    <div className="about-cyber-card">
                      <ListItem>
                        Hot Heads is a 100 Piece 1/1 NFT Collection on the
                        Solana Blockchain.
                      </ListItem>
                    </div>
                  </ScrollItem>
                  <ScrollItem key="info-2" enableY={true} duration={0.8}>
                    <div className="about-cyber-card">
                      <ListItem>
                        A new Hot Head is auctioned weekly, only on Exchange
                        Art.
                      </ListItem>
                    </div>
                  </ScrollItem>
                  <ScrollItem key="info-3" enableY={true} duration={0.8}>
                    <div className="about-cyber-card">
                      <ListItem>
                        The project is founded and created by Sikedelic, a long
                        time contributor in the Web 3 space.
                      </ListItem>
                    </div>
                  </ScrollItem>
                  <ScrollItem key="info-4" enableY={true} duration={0.8}>
                    <div className="about-cyber-card">
                      <ListItem>
                        Our primary methods of communication are Discord and X.
                      </ListItem>
                    </div>
                  </ScrollItem>
                </div>
              </motion.div>
            ) : (
              <motion.div
                {...midExitAnimation}
                key="lore"
                className="h-full text-center py-4 px-0 lg:px-8 2xl:px-20 flex flex-col gap-7"
              >
                <ScrollItem>
                  <div className="about-cyber-card text-left normal-case font-daysOne leading-7">
                    Hidden deep within the Earth&apos;s core reside a sinister
                    cult of one hundred unique magma rocks.
                  </div>
                </ScrollItem>
                <ScrollItem>
                  <div className="about-cyber-card text-left normal-case font-daysOne leading-7">
                    These devilish creatures are known to many as the{" "}
                    <span className="bg-gradient-to-t from-[#FF5722] to-[#FFBA21] text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,87,34,0.28)]">
                      Hot Heads
                    </span>
                    .
                  </div>
                </ScrollItem>
                <ScrollItem>
                  <div className="about-cyber-card text-left normal-case font-daysOne leading-7">
                    The flame-like beings rule throughout the gruesome
                    Underworld, watching over all of the tortured souls.
                  </div>
                </ScrollItem>
                <ScrollItem>
                  <div className="about-cyber-card text-left normal-case font-daysOne leading-7">
                    They&apos;re fierce but fair creatures, until their temperature
                    rises, then they may not be so forgiving.
                  </div>
                </ScrollItem>
                <ScrollItem>
                  <div className="relative overflow-hidden rounded-[8px] border border-white/10 bg-[#070809] shadow-[0_0_34px_rgba(255,61,154,0.12)]">
                    <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-custom-yellow/10" />
                    <Image
                      src="/images/underworld-octo.png"
                      alt="Underworld"
                      width={3000 / 2}
                      height={1002 / 2}
                      className="w-full object-cover opacity-90"
                    />
                  </div>
                </ScrollItem>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;