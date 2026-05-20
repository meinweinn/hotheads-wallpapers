import type { GetServerSideProps, NextPage } from "next";

const DreamYou: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination:
        "https://x.com/intent/post?text=dream%20me%0Ahttps%3A%2F%2Fx.com%2FHotHeadsNFT%2Fstatus%2F2055340900901912864",
      permanent: false,
    },
  };
};

export default DreamYou;
