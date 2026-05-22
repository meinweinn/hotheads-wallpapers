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
    size = 15,
    url = "https://x.com/HotHeadsNFT",
  } = props;
  return (
    <a
      href={url}
      rel="noreferrer"
      target="_blank"
      className="flex cursor-pointer rounded-full bg-[#0b0b0be6] border-2 border-white/70 hover:border-custom-yellow shadow-[0_4px_14px_rgba(0,0,0,0.85)] hover:shadow-[0_0_14px_rgba(255,186,33,0.75)] p-1.5 backdrop-blur-[2px] transition-all duration-200"
    >
      <span className="rounded-full bg-black/70 ring-1 ring-white/25 p-[3px]">
        <Image
          src="/images/x-logo.svg"
          width={size}
          height={size}
          alt="X"
        />
      </span>
    </a>
  );
};

export default TwitterIcon;
