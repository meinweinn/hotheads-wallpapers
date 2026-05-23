import { Collection } from "@types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import CloseIcon from "../@icons/CloseIcon";

interface GallerySidebarProps {
  selectedItem: Collection | null;
  close: Dispatch<SetStateAction<Collection | null>>;
}

const getXHandle = (url: string): string => {
  if (!url) return "Not linked";

  try {
    const parsedUrl = new URL(url);
    const handle = parsedUrl.pathname.replaceAll("/", "").trim();
    return handle ? `@${handle}` : "Not linked";
  } catch {
    return "Not linked";
  }
};

const GallerySidebar: FC<GallerySidebarProps> = ({ selectedItem, close }) => {
  const xHandle = useMemo(
    () => getXHandle(selectedItem?.url ?? ""),
    [selectedItem]
  );
  const holderLabel =
    selectedItem?.holder || (xHandle !== "Not linked" ? xHandle : "Unknown");

  if (!selectedItem) {
    return (
      <aside className="hidden lg:flex w-full max-w-[380px] shrink-0 flex-col rounded-[8px] border border-white/10 bg-[#111111]">
        <div className="border-b border-white/10 px-5 py-4">
          <span className="font-primary text-[10px] uppercase tracking-[0.18em] text-custom-yellow">
            Hot Heads
          </span>
          <h3 className="mt-1 text-xl text-white">Select a profile</h3>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10 text-center text-sm text-custom-light-gray">
          Click a Hot Head card to inspect holder details here.
        </div>
      </aside>
    );
  }

  return (
    <motion.aside
      key={`gallery-sidebar-${selectedItem.id}`}
      className="w-full shrink-0 overflow-hidden rounded-[8px] border border-white/10 bg-[#111111] shadow-[0_18px_48px_rgba(0,0,0,0.35)] lg:sticky lg:top-0 lg:max-w-[380px]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex flex-col gap-1">
          <span className="font-primary text-[10px] uppercase tracking-[0.18em] text-custom-yellow">
            Hot Heads
          </span>
          <h3 className="text-xl text-white">{selectedItem.name}</h3>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-custom-yellow hover:bg-white/10"
          type="button"
          aria-label="Close details"
          onClick={() => close(null)}
        >
          <CloseIcon color="#F3F3F3" />
        </button>
      </div>
      <div className="network-scroll max-h-[70vh] overflow-y-auto px-5 py-5 lg:max-h-[calc(100vh-220px)]">
        <div className="overflow-hidden rounded-[8px] border border-white/10 bg-[#161616]">
          <div className="relative aspect-square w-full bg-[#0b0b0b]">
            <Image
              src={selectedItem.src}
              alt={selectedItem.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm text-white">{selectedItem.name}</p>
              <p className="font-primary text-[10px] uppercase text-custom-yellow">
                #{selectedItem.id.toString().padStart(3, "0")}
              </p>
            </div>
            <div className="rounded-full border border-custom-yellow/40 bg-custom-yellow/10 px-3 py-1 font-primary text-[10px] uppercase text-custom-yellow">
              Profile
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <div className="rounded-[8px] border border-white/10 bg-[#161616] px-4 py-3">
            <p className="font-primary text-[10px] uppercase text-custom-light-gray">
              Name
            </p>
            <p className="mt-2 text-sm text-white">{selectedItem.name}</p>
          </div>
          <div className="rounded-[8px] border border-white/10 bg-[#161616] px-4 py-3">
            <p className="font-primary text-[10px] uppercase text-custom-light-gray">
              Holder
            </p>
            <p className="mt-2 text-sm text-white">{holderLabel}</p>
          </div>
          <div className="rounded-[8px] border border-white/10 bg-[#161616] px-4 py-3">
            <p className="font-primary text-[10px] uppercase text-custom-light-gray">
              Level
            </p>
            <p className="mt-2 text-sm text-white">
              {selectedItem.level || "Unranked"}
            </p>
          </div>
          <div className="rounded-[8px] border border-white/10 bg-[#161616] px-4 py-3">
            <p className="font-primary text-[10px] uppercase text-custom-light-gray">
              X Link
            </p>
            {selectedItem.url ? (
              <a
                className="mt-2 inline-flex items-center gap-2 text-sm text-custom-yellow transition-colors hover:text-white"
                href={selectedItem.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Image
                    src="/images/x-logo.svg"
                    alt="X"
                    width={14}
                    height={14}
                  />
                </span>
                {xHandle}
              </a>
            ) : (
              <p className="mt-2 text-sm text-custom-light-gray">Not linked</p>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default GallerySidebar;
