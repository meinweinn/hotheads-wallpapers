import { CloseIcon } from "@components";
import { Collection } from "@types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useEffect, useMemo } from "react";

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
  useEffect(() => {
    if (selectedItem) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedItem]);

  const xHandle = useMemo(
    () => getXHandle(selectedItem?.url ?? ""),
    [selectedItem]
  );
  const holderLabel =
    selectedItem?.holder || (xHandle !== "Not linked" ? xHandle : "Unknown");

  return (
    <AnimatePresence mode="wait">
      {selectedItem && (
        <motion.div
          key={`gallery-sidebar-${selectedItem.id}`}
          className="fixed inset-0 z-50 bg-custom-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => close(null)}
        >
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-white/10 bg-[#111111] shadow-[-24px_0_80px_rgba(0,0,0,0.55)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(event) => event.stopPropagation()}
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
            <div className="network-scroll flex-1 overflow-y-auto px-5 py-5">
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
                    <p className="mt-2 text-sm text-custom-light-gray">
                      Not linked
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GallerySidebar;
