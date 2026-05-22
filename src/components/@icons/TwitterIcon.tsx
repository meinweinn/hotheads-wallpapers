import { FC, SVGProps } from "react";
import Image from "next/image";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
  url?: string;
}

const TwitterIcon: FC<Props> = (props: Props) => {
  const {
    color = "white",
    size = 26,
    url = "https://x.com/HotHeadsNFT",
  } = props;
  return (
    <a href={url} rel="noreferrer" target="_blank">
      <Image
        src="/images/x-logo.svg"
        width={size}
        height={size}
        alt="X"
      />
    </a>
  );
};

export default TwitterIcon;
