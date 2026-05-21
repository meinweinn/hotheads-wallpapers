import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import { inventory, midEnterAnimation } from "@constants";
import { Inventory } from "@types";
import { InventoryItem } from "@components";
import { Metadata } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";
interface Tab {
  name: string;
  icon: string;
}

const _tabs: Tab[] = [
  {
    name: "PFP",
    icon: "user.svg",
  },
  {
    name: "Banners",
    icon: "image.svg",
  },
  {
    name: "Wallpapers",
    icon: "laptop.svg",
  },
  {
    name: "Memes",
    icon: "smiley.svg",
  },
];
interface Props {
  hasToken?: boolean;
  activeTab: number;
  selectedToken: number;
  tokens: Metadata[] | undefined;
  setImageModal: Dispatch<SetStateAction<string>>;
}
const InventoryItems: FC<Props> = (props: Props) => {
  const {
    hasToken = false,
    activeTab,
    selectedToken,
    tokens,
    setImageModal,
  } = props;

  const [inventoryData, setInventoryData] = useState<Inventory[]>();

  const tabs: string[] = ["pfp", "banners", "wallpapers", "memes"];

  const { publicKey } = useWallet();

  const filterInventory = useCallback(async () => {
    const newData = await Promise.all(
      inventory.filter((filterItem) => {
        //show assets if connected
        if (
          selectedToken === -1 &&
          publicKey &&
          tokens &&
          tokens.reduce((hit, tok) => {
            if (tok?.name === filterItem.hash) {
              console.log("connected ", tok?.name);
              return true;
            }
            return hit;
          }, false)
        ) {
          return true;
        }

        //show hh in dropdown
        if (selectedToken > -1 && filterItem.id === selectedToken) {
          return true;
        }
        // //show all if disconnected
        // if (!publicKey || (publicKey && !hasToken)) {
        //   return true;
        // }

        if (selectedToken === -1 && !publicKey) {
          return true;
        }

        return false;
      })
    );
    setInventoryData(newData);
  }, [publicKey, selectedToken, tokens]);

  useEffect(() => {
    filterInventory();
  }, [filterInventory]);

  return (
    <motion.div
      className="container-child flex flex-wrap items-center justify-center gap-4 gap-x-6 overflow-x-clip overflow-y-auto h-full px-4 md:px-10 py-8"
      key="inventory-grid"
      // {...midEnterAnimation}
    >
      {inventoryData &&
        inventoryData.map((item: Inventory, index: number) => {
          if (
            item[tabs[activeTab] as keyof Inventory] &&
            Array.isArray(item[tabs[activeTab] as keyof Inventory])
          ) {
            //show no assets message
            if (
              (selectedToken > -1 || (publicKey && hasToken && index === 0)) &&
              //@ts-ignore
              item[tabs[activeTab] as keyof Inventory].length === 0
            ) {
              return (
                <div key={`empty ${Math.random()}`} className="text-xs">
                  NO {_tabs[activeTab].name} FOUND
                </div>
              );
            }
            //render view
            //@ts-ignore
            if (item[tabs[activeTab] as keyof Inventory].length > 0) {
              //@ts-ignore
              return item[tabs[activeTab] as keyof Inventory].map(
                (src: string) => (
                  <InventoryItem
                    key={`${Math.random()} ${item.id}`}
                    src={src}
                    setImageModal={setImageModal}
                    index={item.id}
                    activeTab={activeTab}
                  />
                )
              );
            }
          }
        })}
    </motion.div>
  );
};

export default InventoryItems;
