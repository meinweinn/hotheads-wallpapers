import { Dispatch, FC, memo, SetStateAction } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExchangeIcon } from "@components";
import { Collab } from "@types";

interface CollabItemProps {
  index: number;
  item: Collab;
  setImageModal: Dispatch<SetStateAction<string>>;
}

const CollabItem: FC<CollabItemProps> = (props: CollabItemProps) => {
  const { index, item, setImageModal } = props;
  return (
    <div
      className={`rounded-lg md:rounded relative flex flex-col items-center w-full gap-3 py-1`}
    >
      <motion.div
        className="medium-frame relative cursor-pointer w-[250px] h-[250px] overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          setImageModal(item.src);
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {item.src.endsWith(".mp4") || item.src.endsWith(".mov") ? (
          <video width="300" height="300" controls loop>
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={item.src}
            alt={`Colab-${index}`}
            // height={300}
            // width={300}
            style={{ objectFit: "cover" }}
            sizes="250px"
            fill
          />
        )}
        {item.url && (
          <div className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 z-10 flex gap-1">
            <div
              className={`cursor-pointer hover:outline hover:outline-white rounded-full transition-all duration-100`}
              onClick={() => window.open(item.url, "_blank", "noreferrer")}
            >
              <ExchangeIcon size={25} />
            </div>
          </div>
        )}
      </motion.div>
      <p className="hh-name text-center w-full text-[9px] md:text-[10px] max-w-[200px]">
        {item.label}
      </p>
    </div>
  );
};

export default memo(CollabItem);
