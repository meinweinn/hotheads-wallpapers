import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { motion } from "framer-motion";
import { inventory } from "@constants";
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

  const tabs: string[] = ["pfp", "banners", "wallpapers", "memes"];

  const { publicKey } = useWallet();
  const ownedTokenNames = useMemo(
    () => new Set(tokens?.map((token) => token?.name).filter(Boolean)),
    [tokens]
  );
  const inventoryData = useMemo(
    () =>
      inventory.filter((filterItem) => {
        if (
          selectedToken === -1 &&
          publicKey &&
          ownedTokenNames.has(filterItem.hash)
        ) {
          return true;
        }

        if (selectedToken > -1 && filterItem.id === selectedToken) {
          return true;
        }

        if (selectedToken === -1 && !publicKey) {
          return true;
        }

        return false;
      }),
    [ownedTokenNames, publicKey, selectedToken]
  );

  return (
    <motion.div
      className="container-child flex flex-wrap items-center justify-center gap-4 gap-x-6 overflow-x-clip overflow-y-auto h-full px-4 md:px-10 py-8"
      key="inventory-grid"
    >
      {inventoryData.map((item: Inventory, index: number) => {
        const assets = item[tabs[activeTab] as keyof Inventory];

        if (!assets || !Array.isArray(assets)) return null;

        if (
          (selectedToken > -1 || (publicKey && hasToken && index === 0)) &&
          assets.length === 0
        ) {
          return (
            <div key={`empty-${item.id}-${activeTab}`} className="text-xs">
              NO {_tabs[activeTab].name} FOUND
            </div>
          );
        }

        if (assets.length > 0) {
          return assets.map((src: string) => (
            <InventoryItem
              key={`${item.id}-${activeTab}-${src}`}
              src={src}
              setImageModal={setImageModal}
              index={item.id}
              activeTab={activeTab}
            />
          ));
        }

        return null;
      })}
    </motion.div>
  );
};

export default InventoryItems;