import { PageLayout, TabBar } from "@components";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { midExitAnimation } from "@constants";

const Network: NextPage = () => {
  const [tabId, setTabId] = useState<number>(0);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    telegram: "",
    twitter: "",
    wallet: "",
    twitterFollow: false,
  });
  const [formError, setFormError] = useState<string>("");
  const [submitFeedback, setSubmitFeedback] = useState<string>("");
  const tabs: string[] = ["hub", "projects", "form"];

  const isFormComplete =
    formData.telegram.trim().length > 0 &&
    formData.twitter.trim().length > 0 &&
    formData.wallet.trim().length > 0 &&
    formData.twitterFollow;

  const handleViewRules = () => {
    setSubmitFeedback("");
    if (!isFormComplete) {
      setFormError("Complete the form before viewing rules.");
      return;
    }
    setFormError("");
    setShowRules(true);
  };

  const handleSubmit = () => {
    setSubmitFeedback("Application ready. Submission endpoint pending.");
  };

  return (
    <PageLayout header="Network">
      <div className="w-full h-full md:px-8 md:pt-8 flex flex-col items-center gap-10 lg:gap-5 pt-5">
        <TabBar tabs={tabs} handleTabChange={setTabId} />
        <div className="container overflow-y-hidden lg:overflow-y-auto overflow-x-hidden h-full w-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {tabId === 0 && (
              <motion.div
                key="hub"
                className="h-full w-full flex flex-col items-center justify-center gap-10 px-4 py-10 text-center"
                {...midExitAnimation}
              >
                <motion.div
                  className="relative w-[260px] max-w-full h-[102px] md:w-[360px] md:h-[141px] drop-shadow-[0_0_24px_rgba(255,87,34,0.75)]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/images/logo_base.png"
                    alt="Hot Heads"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </motion.div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-custom-yellow">
                  <div className="hh-name px-5 py-3 min-w-[190px]">
                    <p className="text-gray-100">Operators</p>
                    <p>28</p>
                  </div>
                  <div className="hh-name px-5 py-3 min-w-[230px]">
                    <p className="text-gray-100">Latest Drop</p>
                    <p>Paid.</p>
                  </div>
                </div>
              </motion.div>
            )}
            {tabId === 1 && (
              <motion.div
                key="projects"
                className="h-full w-full"
                {...midExitAnimation}
              />
            )}
            {tabId === 2 && (
              <motion.div
                key="form"
                className="network-scroll h-full w-full overflow-y-auto overflow-x-hidden px-1 md:px-8 py-4"
                {...midExitAnimation}
              >
                <AnimatePresence mode="wait">
                  {!showRules ? (
                    <motion.form
                      key="network-application"
                      className="mx-auto flex w-full max-w-2xl flex-col gap-5 text-xs md:text-sm"
                      onSubmit={(event) => event.preventDefault()}
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <label className="flex flex-col gap-2">
                        Telegram Username
                        <input
                          className="bg-custom-black border-2 border-custom-light-gray-2 rounded px-3 py-3 text-gray-100 outline-none focus:border-custom-yellow"
                          name="telegram"
                          placeholder="@username"
                          type="text"
                          value={formData.telegram}
                          onChange={(event) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              telegram: event.target.value,
                            }))
                          }
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        Twitter Username
                        <input
                          className="bg-custom-black border-2 border-custom-light-gray-2 rounded px-3 py-3 text-gray-100 outline-none focus:border-custom-yellow"
                          name="twitter"
                          placeholder="@username"
                          type="text"
                          value={formData.twitter}
                          onChange={(event) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              twitter: event.target.value,
                            }))
                          }
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        Solana Wallet Address
                        <input
                          className="bg-custom-black border-2 border-custom-light-gray-2 rounded px-3 py-3 text-gray-100 outline-none focus:border-custom-yellow"
                          name="wallet"
                          placeholder="Wallet address"
                          type="text"
                          value={formData.wallet}
                          onChange={(event) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              wallet: event.target.value,
                            }))
                          }
                        />
                      </label>
                      <label className="flex items-start gap-3 leading-6 text-left">
                        <input
                          className="mt-1 h-4 w-4 accent-custom-yellow"
                          name="twitterFollow"
                          type="checkbox"
                          checked={formData.twitterFollow}
                          onChange={(event) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              twitterFollow: event.target.checked,
                            }))
                          }
                        />
                        <span>I confirm I follow on Twitter</span>
                      </label>
                      {formError && (
                        <div className="text-custom-light-red text-center text-[10px]">
                          {formError}
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row gap-3 justify-center pt-2">
                        <button
                          className={`bg-button bg-cover w-[171.5px] h-[56px] text-[10px] uppercase transition-opacity ${
                            isFormComplete
                              ? "opacity-80 hover:opacity-100"
                              : "opacity-40"
                          }`}
                          type="button"
                          onClick={handleViewRules}
                        >
                          View Rules
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="network-rules"
                      className="mx-auto flex w-full max-w-2xl flex-col gap-6 text-left normal-case font-daysOne text-xs md:text-sm"
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <button
                        className="self-start text-custom-yellow uppercase font-primary text-[10px] hover:text-custom-light-red transition-colors"
                        type="button"
                        onClick={() => setShowRules(false)}
                      >
                        Back to Form
                      </button>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-custom-yellow uppercase font-primary text-sm">
                          Campaign Rules
                        </h3>
                        <ol className="list-decimal pl-5 flex flex-col gap-3">
                          <li>
                            Only submit if you actively follow the required
                            campaign socials and will stay engaged for the
                            campaign duration.
                          </li>
                          <li>
                            When the project reaches a market cap of 5 million,
                            at least one post should be engaged with.
                          </li>
                          <li>
                            When the project reaches a market cap of 10 million,
                            a post should be made on Twitter.
                          </li>
                          <li>
                            The project should be shared within Friends & Family
                            (FnFs) groups.
                          </li>
                        </ol>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-custom-yellow uppercase font-primary text-sm">
                          Selling Rules
                        </h3>
                        <ol className="list-decimal pl-5 flex flex-col gap-3">
                          <li>
                            No selling should take place during the first 3 days.
                          </li>
                          <li>
                            Selling is not permitted unless the 5 million
                            marketcap is fulfilled.
                          </li>
                          <li>
                            After day 7, if the project has not exceeded a
                            market cap of 5 million, selling is permitted.
                          </li>
                        </ol>
                      </div>
                      <div className="flex justify-center pt-2">
                        <button
                          className="bg-button bg-cover w-[171.5px] h-[56px] text-[10px] uppercase opacity-80 hover:opacity-100 transition-opacity"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                      {submitFeedback && (
                        <div className="text-custom-green text-center text-[10px] uppercase font-primary">
                          {submitFeedback}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
};

export default Network;
