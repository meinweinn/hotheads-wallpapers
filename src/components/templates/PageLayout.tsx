import { FC, ReactNode, useEffect, useState } from "react";
import { PageHead, Header, Footer, Navigation } from "@components";
import { enterAnimation } from "@constants";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  header?: string;
}

const PageLayout: FC<Props> = (props: Props) => {
  const { children, header } = props;
  const [didMount, setDidMount] = useState<boolean>(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <div className="site-shell bg-main bg-cover bg-fixed relative flex flex-col justify-between min-h-screen lg:h-screen transition-colors ease-in-out duration-300 bg-dark overflow-none">
      <div className="site-cyber-glow absolute inset-0" />
      <div className="site-scanlines absolute inset-0" />
      <PageHead title="Hot Heads" description="Welcome to the Underworld" />
      <Navigation />
      <main className="relative z-10 flex flex-col flex-grow justify-start items-center h-full w-full px-0 md:px-16 lg:px-44 2xl:px-[15%] mb-0 lg:mb-auto lg:pb-6 py-0 2xl:py-6 4xl:py-[8%]">
        {didMount && (
          // <div className="bg-custom-dark-gray h-full w-full md:rounded-2xl lg:rounded-[80px] flex flex-col items-center my-4 py-10 px-3  overflow-hidden ">
          <div className="h-full w-full flex flex-col items-center my-4 pt-10 px-3 overflow-hidden ">
            {header && (
              <motion.h2
                className="site-page-title text-transparent bg-clip-text bg-red-text-gradient text-4xl uppercase "
                {...enterAnimation}
              >
                {header}
              </motion.h2>
            )}
            <motion.div
              className="lg:overflow-y-auto p-2 2xl:px-14 w-full h-full flex flex-col "
              {...enterAnimation}
            >
              {children}
            </motion.div>
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
