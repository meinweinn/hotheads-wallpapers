import { Dispatch, FC, memo, SetStateAction } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Collection } from "@types";

interface GalleryItemProps {
  item: Collection;
  onSelect: Dispatch<SetStateAction<Collection | null>>;
}

const GalleryItem: FC<GalleryItemProps> = (props: GalleryItemProps) => {
  const { item, onSelect } = props;
  const { id, src, name } = item;
  // const ref = useRef(null) as RefObject<HTMLDivElement> | undefined;

  // const { scrollY } = useScroll({
  //   target: ref,
  //   offset: ["end end", "start start"],
  // });

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   // console.log("child scroll: ", latest);
  //   setProgress(latest);
  // });

  const formattedId = id.toString().padStart(3, "0");

  return (
    <div
      className="relative flex cursor-pointer flex-col items-center"
      key={id}
      onClick={() => onSelect(item)}
    >
      <motion.div
        className="medium-frame relative"
        key={id}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={`HH-${id}`}
          width={200}
          height={200}
          loading="lazy"
        />
      </motion.div>
      <div className="hh-name text-center mt-4 mb-1 w-full text-[10px] max-w-[200px]">
        <p className="text-sm whitespace-nowrap">{name}</p>
        <p className="text-[#FFC812]">#{formattedId}</p>
      </div>
    </div>
  );
};

export default memo(GalleryItem);
