import { PageLayout, TabBar } from "@components";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { midExitAnimation } from "@constants";

const Network: NextPage = () => {
  const [tabId, setTabId] = useState<number>(0);
  const tabs: string[] = ["hub", "projects", "form"];

  return (
    <PageLayout header="Network">
      <div className="w-full h-full md:px-8 md:pt-8 flex flex-col items-center gap-10 lg:gap-5 pt-5">
        <TabBar tabs={tabs} handleTabChange={setTabId} />
        <div className="container overflow-y-hidden lg:overflow-y-auto overflow-x-hidden h-full w-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {tabId === 0 && (
              <motion.div
                key="hub"
                className="h-full w-full flex flex-col items-center justify-center gap-10 px-4 py-10 text-center"
                {...midExitAnimation}
              >
                <div className="relative w-[260px] max-w-full h-[102px] md:w-[360px] md:h-[141px]">
                  <Image
                    src="/images/logo_base.png"
                    alt="Hot Heads"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-custom-yellow">
                  <div className="hh-name px-5 py-3 min-w-[190px]">
                    <p className="text-gray-100">Operators</p>
                    <p>28</p>
                  </div>
                  <div className="hh-name px-5 py-3 min-w-[230px]">
                    <p className="text-gray-100">Latest Drop</p>
                    <p>Paid.</p>
                  </div>
                </div>
              </motion.div>
            )}
            {tabId === 1 && (
              <motion.div
                key="projects"
                className="h-full w-full"
                {...midExitAnimation}
              />
            )}
            {tabId === 2 && (
              <motion.div
                key="form"
                className="h-full w-full"
                {...midExitAnimation}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
};

export default Network;
