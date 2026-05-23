import {
  PageLayout,
  TabBar,
  Modal,
  Collab,
  Gallery,
  GallerySidebar,
} from "@components";
import { useState } from "react";
import { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { midExitAnimation, collections, collabs } from "@constants";
import Image from "next/image";
import { Collection } from "@types";

const Home: NextPage = () => {
  const [tabId, setTabId] = useState<number>(0);
  const [imageModal, setImageModal] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Collection | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const tabs: string[] = ["hot heads", "collabs"];
  const handleTabChange = (tab: number) => {
    setSelectedItem(null);
    setImageModal("");
    setTabId(tab);
  };

  return (
    <PageLayout header="Gallery">
      <motion.div className="w-full h-full md:px-8 md:pt-8 flex flex-col items-center gap-10 lg:gap-5 pt-5">
        {/* toggle  */}
        <TabBar tabs={tabs} handleTabChange={handleTabChange} />
        {/* content */}
        <div className="container overflow-y-hidden lg:overflow-y-auto overflow-x-hidden h-full flex flex-col gap-10">
          <AnimatePresence mode="wait">
            {tabId === 0 ? (
              <motion.div {...midExitAnimation} key="hot-heads">
                <Gallery collection={collections} onSelect={setSelectedItem} />
              </motion.div>
            ) : (
              <motion.div {...midExitAnimation} key="collab">
                <Collab collabs={collabs} setImageModal={setImageModal} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* modal */}
      <Modal
        show={imageModal.length > 0}
        close={setImageModal}
        contentLoaded={imageLoaded}
      >
        {imageModal.endsWith(".mp4") || imageModal.endsWith(".mov") ? (
          <video controls loop>
            <source src={imageModal} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={imageModal}
            style={{ objectFit: "contain" }}
            fill
            alt="Image"
            objectFit="contain"
            onLoadingComplete={() => setImageLoaded(true)}
          />
        )}
      </Modal>
      <GallerySidebar selectedItem={selectedItem} close={setSelectedItem} />
    </PageLayout>
  );
};
export default Home;
