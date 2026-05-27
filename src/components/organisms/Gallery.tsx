import { Dispatch, FC, SetStateAction } from "react";
import { GalleryItem, ScrollItem } from "@components";
import { Collection } from "@types";
import { useWindowSize } from "@hooks";
import { motion } from "framer-motion";

interface GalleryProps {
  collection: Collection[];
  onSelect: Dispatch<SetStateAction<Collection | null>>;
}

const Gallery: FC<GalleryProps> = (props: GalleryProps) => {
  const { collection, onSelect } = props;
  const [winWidth] = useWindowSize();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const getDelayOrder = (index: number): number => {
    if (winWidth >= 2160) {
      return index <= 20 ? index % 20 : index % 5;
    } else if (winWidth >= 1536) {
      return index <= 8 ? index % 8 : index % 4;
    } else if (winWidth > 768) {
      return index <= 15 ? index % 15 : index % 3;
    } else {
      return index <= 6 ? index % 6 : index % 2;
    }
  };

  if (collection.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-primary text-sm uppercase text-custom-yellow drop-shadow-[0_0_10px_rgba(255,186,33,0.24)]">
          No Signal
        </p>
        <p className="font-daysOne text-sm normal-case text-white/55">
          No Hot Head matched your search.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-2 md:gap-x-8 md:gap-y-3 md:px-6 py-5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {collection.map((item, index) => {
        return (
          <ScrollItem
            duration={1}
            key={item.id}
            index={getDelayOrder(index)}
            enableY={true}
            isInViewOnce={true}
          >
            <GalleryItem item={item} onSelect={onSelect} />
          </ScrollItem>
        );
      })}
    </motion.div>
  );
};

export default Gallery;