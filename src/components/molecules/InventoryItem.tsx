import { Dispatch, FC, SetStateAction } from "react";
import { motion } from "framer-motion";
import { midEnterAnimation } from "@constants";
import Image from "next/image";
import { DownloadIcon, ScrollItem } from "@components";
import download from "downloadjs";

interface InventoryItemProps {
  src: string;
  setImageModal: Dispatch<SetStateAction<string>>;
  index: number;
  activeTab: number;
}

const InventoryItem: FC<InventoryItemProps> = (props: InventoryItemProps) => {
  const { src, setImageModal, index, activeTab } = props;

  const folder = () => {
    return activeTab === 0
      ? "PFP"
      : activeTab === 1
      ? "Banner"
      : activeTab === 2
      ? "Wallpaper"
      : "Memes";
  };

  const formattedSrc = src.startsWith("/images/")
    ? src
    : `/images/hotheads/hh_${index}/${folder()}/${src}`;
  // console.log("src ", src);
  return (
    <div className={`self-start`}>
      <ScrollItem>
        <motion.div
          className={`rounded-xl flex flex-col items-center justify-center gap-4`}
          // {...midEnterAnimation}
        >
          <motion.div
            onClick={() => setImageModal(formattedSrc)}
            className="cursor-pointer w-[200px] h-[200px] relative"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {src.endsWith(".mp4") || src.endsWith(".mov") ? (
              <video width="300" height="300" controls loop>
                <source src={formattedSrc} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={formattedSrc}
                alt={`${folder()}-${index}`}
                className="rounded-sm"
                style={{ objectFit: "cover" }}
                fill
              />
            )}
          </motion.div>

          <div className="" onClick={() => download(formattedSrc)}>
            <DownloadIcon />
          </div>
        </motion.div>
      </ScrollItem>
    </div>
  );
};

export default InventoryItem;
