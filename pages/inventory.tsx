import { PageLayout, InventoryTabs, Modal, Dropdown } from "@components";
import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { midExitAnimation, collections } from "@constants";
import { getTokensByOwner } from "@helpers";
import { FindNftsByOwnerOutput, Metadata } from "@metaplex-foundation/js";
import axios from "axios";
import Image from "next/image";

const Home: NextPage = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<
    FindNftsByOwnerOutput[] | undefined
  >();
  const [error, setError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [imageModal, setImageModal] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [selectedToken, setSelectedToken] = useState<number>(-1);
  const [counter, setCounter] = useState<number>(0);

  const getTokens = useCallback(async () => {
    try {
      //fetch tokens
      const tokens = await getTokensByOwner(connection, publicKey);
      if (!tokens) return;

      //fetch metadata
      const jsonArr: FindNftsByOwnerOutput[] = [];
      await Promise.all(
        tokens.map(async (token) => {
          if (token.name.includes("Hot Head")) {
            const uri = token.uri;
            try {
              await axios.get(uri).then((r) => {
                // console.log(uri, r.data);
                jsonArr.push(r.data);
              });
            } catch (e: any) {
              console.error(e.message);
            }
          }
        })
      );
      setMetadata(jsonArr);
    } catch (e: any) {
      console.error("getTokens ", e.message);
      setError(true);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  useEffect(() => {
    setDidMount(true);
  }, []);
  //reset data on disconnect
  useEffect(() => {
    if (!connection || !publicKey) {
      setMetadata(undefined);
    }
    setError(false);
  }, [connection, publicKey]);

  //used to alternate views
  useEffect(() => {
    setCounter((prevState) => prevState + 1);
  }, [selectedToken, activeTab]);

  return (
    <PageLayout header="Inventory">
      {didMount && (
        <div className="h-full px-0 md:px-6 lg:px-10 flex flex-col w-full items-center gap-4 overflow-y-hidden">
          <div className="text-sm text-center h-6 pt-10 flex flex-col w-full items-center justify-center">
            <AnimatePresence mode="wait">
              {error && (
                <div className="text-red-500 text-sm text-center">
                  Error retrieving NFTs
                </div>
              )}
              {/* has hot head */}
              {publicKey &&
                connection &&
                !error &&
                metadata &&
                metadata.length > 0 && (
                  <motion.div
                    className=""
                    key="connected"
                    {...midExitAnimation}
                  >
                    <div className="text-custom-green text-sm text-center h-6 py-7 md:pt-6 md:pb-4 flex flex-col w-full  items-center justify-center">
                      Connected
                    </div>
                  </motion.div>
                )}
              {/* no hot heads found */}
              {publicKey &&
                connection &&
                !error &&
                metadata &&
                metadata.length === 0 && (
                  <div className="text-red-500 ">No Hot Heads found</div>
                )}
              {/* error fetching nfts */}
              {publicKey && connection && error && (
                <div className="text-red-500">Error fetching NFTs</div>
              )}
              {/* not signed in */}
              {(!publicKey || !connection) && !error && (
                <motion.div
                  className=""
                  key="disconnected"
                  {...midExitAnimation}
                >
                  <div className="text-custom-green text-sm text-center h-6 py-7 md:pt-6 md:pb-4 flex flex-col w-full  items-center justify-center">
                    Connect wallet to view your Hot Heads
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <InventoryTabs
            hasToken={metadata && metadata.length > 0}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tokens={metadata as Metadata[] | undefined}
            setImageModal={setImageModal}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            counter={counter}
            setCounter={setCounter}
            // didHover={didHover}
            // setDidHover={setDidHover}
          />
        </div>
      )}
      {/* modal */}
      <Modal
        show={imageModal.length > 0}
        close={setImageModal}
        contentLoaded={imageLoaded}
      >
        {imageModal.endsWith(".mp4") || imageModal.endsWith(".mov") ? (
          <video controls loop>
            <source src={imageModal} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={imageModal}
            fill={true}
            alt="Image"
            sizes="100vw"
            style={{ objectFit: "contain" }}
            className={`rounded`}
            // onLoadingComplete={() => setImageLoaded(true)}
          />
        )}
      </Modal>
    </PageLayout>
  );
};

export default Home;
