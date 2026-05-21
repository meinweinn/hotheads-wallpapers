import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavItem } from "@components";
import Link from "next/link";
import { useWindowSize } from "@hooks";
import { fadeVariants } from "@constants";

interface Props {
  toggleMenu: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Menu: FC<Props> = (props: Props) => {
  const { toggleMenu, open } = props;
  const [winWidth, winHeight] = useWindowSize();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isTablet: boolean = winWidth < 1000;
  //stop page scroll (when modal or menu open)
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (open) {
      timeoutRef.current = setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 700);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [open]);
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <motion.aside
            key="main-menu"
            // onMouseLeave={() => toggleMenu(false)}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isTablet ? winWidth : 768, opacity: 1 }}
            exit={{
              width: 0,
              transition: { duration: 0.5 },
              opacity: 1,
            }}
            transition={{ duration: 0.7 }}
            className="bg-custom-black fixed top-0 right-0 z-50 shadow-xl lg:rounded-l-lg font-daysOne"
            onClick={() => toggleMenu(false)}
          >
            <motion.div
              className={`px-4 sm:px-6 lg:px-10 py-6 h-screen`}
              variants={fadeVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col items-center justify-start 2xl:items-start pt-[35%] sm:pt-[20%] h-full text-2xl uppercase mr-[14px]">
                <NavItem href="/about">About</NavItem>
                <NavItem href="/gallery">Gallery</NavItem>
                <NavItem href="/inventory">Inventory</NavItem>
                <NavItem href="/network" featured={true}>
                  Network
                </NavItem>
                <NavItem href="/merch" disabled={true}>
                  Merch
                </NavItem>
                <NavItem href="/faq">FAQ</NavItem>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const menuData = [
  {
    name: "For my Slimes",
    data: [
      {
        title: "My Slimes",
        description: "Wallpapers, PFPs, and more",
        src: "/my-slimes",
        isInternal: true,
      },
      {
        title: "About",
        description: "Information about Scum and the project",
        src: "/about",
        isInternal: true,
      },
    ],
  },
  {
    name: "Socials",
    data: [
      {
        title: "Discord",
        description: "The home of all Slimes",
        src: "https://discord.gg/HXQ23Djjvw",
        isInternal: false,
      },
      {
        title: "Twitter",
        description: "Slimes can be social too, right?",
        src: "https://twitter.com/MySlimes_",
        isInternal: false,
      },
    ],
  },
  {
    name: "Secondary",
    data: [
      {
        title: "Exchange Art",
        description: "Buy a Slime on our primary marketplace",
        src: "https://exchange.art/series/Slimes/nfts?sort=contract-type&filters=%7B%7D",
        isInternal: false,
      },
    ],
  },
  {
    name: "Collab",
    data: [
      {
        title: "Collaboration Form",
        description: "We use Subber, check out our form",
        src: "https://www.subber.xyz/slimes/giveaways/collab-request",
        isInternal: false,
      },
    ],
  },
];

interface MenuItems {
  title: string;
  description: string;
  src: string;
  isInternal: boolean;
}
interface MenuGroup {
  name: string;
  data: MenuItems[];
}
interface mgProps {
  group: MenuGroup;
}

const MenuGroup: FC<mgProps> = (props: mgProps) => {
  const { group } = props;
  return (
    <motion.div
      className="font-daysOne flex flex-col gap-3 min-w-[200px] z-50"
      variants={fadeVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <h3 className=" text-3xl  ">{group.name}</h3>
      {group.data.map((item, index) => {
        if (item.isInternal) {
          return (
            <Link href={item.src} key={index}>
              <MenuItem item={item} />
            </Link>
          );
        }
        return (
          <motion.a
            className="cursor-pointer py-1"
            href={item.src}
            target="_blank"
            rel="noreferrer"
            key={index}
          >
            <MenuItem item={item} />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

interface miProps {
  item: MenuItems;
}
const MenuItem: FC<miProps> = (props: miProps) => {
  const { item } = props;
  return (
    <div className="flex flex-col cursor-pointer tex">
      <div className="text-custom-primary text-xl relative hover:underline">
        {item.title}
      </div>
      <p className="text-custom-gray ">{item.description}</p>
    </div>
  );
};

export default Menu;
