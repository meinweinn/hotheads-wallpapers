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
        {/* toggle  */}
        <TabBar tabs={tabs} handleTabChange={handleTabChange} />
        {/* content */}
        <div className="container overflow-y-hidden lg:overflow-y-auto overflow-x-hidden h-full">
          <AnimatePresence mode="wait">
            {tabId === 0 ? (
              <motion.div
                className="h-full flex flex-col gap-10 px-2 md:px-10   pt-11"
                {...midExitAnimation}
                key="info"
              >
                <ScrollItem key="info-1">
                  <ListItem>
                    Hot Heads is a 100 Piece 1/1 NFT Collection on the Solana
                    Blockchain.
                  </ListItem>
                </ScrollItem>
                <ScrollItem key="info-2">
                  <ListItem>
                    A new Hot Head is auctioned weekly, only on Exchange Art.
                  </ListItem>
                </ScrollItem>
                <ScrollItem key="info-3">
                  <ListItem>
                    The project is founded and created by Sikedelic, a long time
                    contributor in the Web 3 space.
                  </ListItem>
                </ScrollItem>
                <ScrollItem key="info-4">
                  <ListItem>
                    Our primary methods of communication are Discord and
                    X.
                  </ListItem>
                </ScrollItem>
              </motion.div>
            ) : (
              <motion.div
                {...midExitAnimation}
                key="lore"
                className="h-full text-center py-4 px-0 lg:px-8 2xl:px-20 flex flex-col gap-10 "
              >
                <ScrollItem>
                  Hidden deep within the Earth&apos;s core reside a sinister
                  cult of one hundred unique magma rocks.
                </ScrollItem>
                <ScrollItem>
                  These devilish creatures are known to many as the{" "}
                  <span className="bg-gradient-to-t from-[#FF5722] to-[#A70606] text-transparent bg-clip-text">
                    Hot Heads
                  </span>
                  .
                </ScrollItem>
                <ScrollItem>
                  The flame-like beings rule throughout the gruesome Underworld,
                  watching over all of the tortured souls.
                </ScrollItem>
                <ScrollItem>
                  They&apos;re fierce but fair creatures, until their
                  temperature rises, then they may not be so forgiving.
                </ScrollItem>
                <ScrollItem>
                  <Image
                    src="/images/underworld-octo.png"
                    alt="Underworld"
                    width={3000 / 2}
                    height={1002 / 2}
                    className="rounded mb-6"
                  />
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
