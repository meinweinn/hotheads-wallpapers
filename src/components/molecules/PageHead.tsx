import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
  description: string;
}

const PageHead: FC<Props> = (props: Props) => {
  const { title, description } = props;
  const siteUrl = "https://hotheads.xyz";
  const metaImageUrl = `${siteUrl}/meta.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@HotHeadsNFT" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImageUrl} />
      <meta property="twitter:url" content={siteUrl} />
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImageUrl} />
    </Head>
  );
};

export default PageHead;
