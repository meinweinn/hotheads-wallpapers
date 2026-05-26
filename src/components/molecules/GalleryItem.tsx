import { Dispatch, FC, SetStateAction } from "react";
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

  const getId = (id: number): string => {
    if (id < 10) return ("00" + id) as string;
    return ("0" + id) as string;
  };

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
        <Image src={src} alt={`HH-${id}`} width={200} height={200} />
      </motion.div>
      <div className="hh-name text-center mt-4 mb-1 w-full text-[10px] max-w-[200px]">
        <p className="text-sm whitespace-nowrap">{name}</p>
        <p className="text-[#FFC812]">#{getId(id)}</p>
      </div>
    </div>
  );
};

export default GalleryItem;
