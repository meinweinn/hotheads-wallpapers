import { FC, SVGProps, useState } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  fillHover?: string;
  color?: string;
  hoverColor?: string;
  size?: number;
}

const MenuCloseIcon: FC<Props> = (props: Props) => {
  const {
    hoverColor = "white",
    className,
    color = "#9ca3af",
    size = 34,
  } = props;
  const [didHover, setDidHover] = useState<boolean>(false);

  return (
    <div
      className="cursor-pointer rounded h-min p-2"
      onMouseEnter={() => setDidHover(true)}
      onMouseLeave={() => setDidHover(false)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={` transition-all duration-300 ${
            didHover ? "stroke-white" : "stroke-gray-400 "
          }`}
        />

        {/* <path
        d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      /> */}
      </svg>
    </div>
  );
};

export default MenuCloseIcon;
