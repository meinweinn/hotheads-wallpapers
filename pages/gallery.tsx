import {
  PageLayout,
  TabBar,
  Modal,
  Collab,
  Gallery,
  GallerySidebar,
} from "@components";
import { useCallback, useMemo, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tabs: string[] = ["hot heads", "collabs"];
  const filteredCollections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return collections;

    return collections.filter((item) => {
      const paddedId = item.id.toString().padStart(3, "0");
      const xHandle = item.url.split("/").filter(Boolean).pop() ?? "";
      const searchable = [
        item.name,
        item.holder ?? "",
        item.level ?? "",
        item.url,
        xHandle,
        item.id.toString(),
        paddedId,
        `#${paddedId}`,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [searchQuery]);
  const handleTabChange = useCallback((tab: number) => {
    setSelectedItem(null);
    setImageModal("");
    setTabId(tab);
  }, []);

  return (
    <PageLayout header="Gallery">
      <motion.div className="w-full h-full md:px-8 md:pt-8 flex flex-col items-center gap-10 lg:gap-5 pt-5">
        {/* toggle  */}
        <TabBar tabs={tabs} handleTabChange={handleTabChange} />
        {tabId === 0 && (
          <motion.div
            className="w-full max-w-2xl px-2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <label className="group relative block">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-primary text-[10px] uppercase text-custom-yellow/80 drop-shadow-[0_0_8px_rgba(255,186,33,0.35)]">
                Search
              </span>
              <input
                className="gallery-search-input w-full rounded-[6px] border border-white/10 bg-[#050607]/85 py-3 pl-[92px] pr-4 text-sm normal-case text-white outline-none shadow-[0_0_22px_rgba(255,61,154,0.08)] transition-all placeholder:text-white/28 focus:border-custom-yellow/70 focus:shadow-[0_0_26px_rgba(255,186,33,0.14)]"
                type="search"
                value={searchQuery}
                placeholder="ID, name, holder, X handle"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
          </motion.div>
        )}
        {/* content */}
        <div className="container overflow-y-hidden lg:overflow-y-auto overflow-x-hidden h-full flex flex-col gap-10">
          <AnimatePresence mode="wait">
            {tabId === 0 ? (
              <motion.div {...midExitAnimation} key="hot-heads">
                <Gallery collection={filteredCollections} onSelect={setSelectedItem} />
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
