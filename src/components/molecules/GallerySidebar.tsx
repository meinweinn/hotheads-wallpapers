import { Collection } from "@types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
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

const isTeamHolder = (holder: string): boolean =>
  ["connor", "mein", "fto"].includes(holder.trim().toLowerCase());

const GallerySidebar: FC<GallerySidebarProps> = ({ selectedItem, close }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const xHandle = useMemo(
    () => selectedItem?.xLabel ?? getXHandle(selectedItem?.url ?? ""),
    [selectedItem]
  );
  const holderLabel =
    selectedItem?.holder || (xHandle !== "Not linked" ? xHandle : "Unknown");
  const showTeamBadge = isTeamHolder(holderLabel);
  const profileId = selectedItem?.id.toString().padStart(3, "0") ?? "000";
  const openXLink = () => {
    if (!selectedItem?.url) return;
    window.open(selectedItem.url, "_blank");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence mode="wait">
      {selectedItem && (
        <motion.div
          key={`gallery-sidebar-${selectedItem.id}`}
          className="fixed inset-0 z-[9999] bg-custom-black/65 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.24, ease: "easeInOut" } }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              close(null);
            }
          }}
        >
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col overflow-hidden border-l border-custom-yellow/20 bg-[#08090b] shadow-[-28px_0_90px_rgba(0,0,0,0.72),0_0_38px_rgba(255,87,34,0.14)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,186,33,0.12),transparent_30%),radial-gradient(circle_at_86%_34%,rgba(255,61,154,0.12),transparent_34%)]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-custom-yellow/70 to-transparent" />
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex flex-col gap-1">
                <span className="font-primary text-[9px] uppercase tracking-[0.22em] text-custom-yellow drop-shadow-[0_0_12px_rgba(255,186,33,0.38)]">
                  Hot Heads Registry
                </span>
                <h3 className="text-2xl leading-none text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]">
                  {selectedItem.name}
                </h3>
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] transition-all hover:border-custom-yellow hover:bg-custom-yellow/10 hover:shadow-[0_0_18px_rgba(255,186,33,0.25)]"
                type="button"
                aria-label="Close details"
                onClick={() => close(null)}
              >
                <CloseIcon color="#F3F3F3" />
              </button>
            </div>
            <div className="network-scroll relative z-10 flex-1 overflow-y-auto px-5 py-5">
              <div className="overflow-hidden rounded-[8px] border border-white/10 bg-[#101113] shadow-[0_18px_46px_rgba(0,0,0,0.42)]">
                <div className="relative aspect-square w-full bg-[#050505]">
                  <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/50" />
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
                  <div>
                    <p className="text-sm text-white">{selectedItem.name}</p>
                    <p className="font-primary text-[10px] uppercase text-custom-yellow">
                      #{profileId}
                    </p>
                  </div>
                  <div className="rounded-full border border-custom-yellow/45 bg-custom-yellow/10 px-3 py-1 font-primary text-[9px] uppercase text-custom-yellow shadow-[0_0_12px_rgba(255,186,33,0.16)]">
                    Profile
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[8px] border border-white/10 bg-white/[0.045] px-4 py-3">
                  <p className="font-primary text-[9px] uppercase text-custom-light-gray">
                    Name
                  </p>
                  <p className="mt-2 truncate text-sm text-white">
                    {selectedItem.name}
                  </p>
                </div>
                <div className="rounded-[8px] border border-white/10 bg-white/[0.045] px-4 py-3">
                  <p className="font-primary text-[9px] uppercase text-custom-light-gray">
                    Level
                  </p>
                  <p className="mt-2 truncate text-sm text-white">
                    {selectedItem.level || "Unranked"}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-[8px] border border-white/10 bg-white/[0.045] px-4 py-3">
                <p className="font-primary text-[9px] uppercase text-custom-light-gray">
                  Holder
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <p className="text-sm text-white">{holderLabel}</p>
                  {showTeamBadge && (
                    <span className="rounded-full border border-custom-yellow/50 bg-custom-yellow/10 px-2.5 py-1 font-primary text-[9px] uppercase text-custom-yellow shadow-[0_0_10px_rgba(255,186,33,0.22)]">
                      Team
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 rounded-[8px] border border-white/10 bg-white/[0.045] px-4 py-3">
                <p className="font-primary text-[9px] uppercase text-custom-light-gray">
                  X Link
                </p>
                {selectedItem.url ? (
                  <button
                    className="relative z-50 mt-3 inline-flex w-full cursor-pointer touch-manipulation items-center justify-between gap-3 rounded-[6px] border border-white/10 bg-[#050505]/80 px-3 py-2 text-sm text-custom-yellow transition-all hover:border-custom-yellow/60 hover:text-white hover:shadow-[0_0_18px_rgba(255,186,33,0.16)]"
                    type="button"
                    onPointerDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      openXLink();
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <span className="pointer-events-none flex items-center gap-2 truncate">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                        <Image
                          src="/images/x-logo.svg"
                          alt="X"
                          width={14}
                          height={14}
                        />
                      </span>
                      <span className="truncate">{xHandle}</span>
                    </span>
                    <span className="pointer-events-none font-primary text-[9px] uppercase text-white/45">
                      Open
                    </span>
                  </button>
                ) : (
                  <p className="mt-2 text-sm text-custom-light-gray">
                    {xHandle}
                  </p>
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default GallerySidebar;