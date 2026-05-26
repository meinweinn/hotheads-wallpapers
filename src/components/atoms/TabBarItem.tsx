import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface TabProps {
  id: number;
  children: ReactNode;
  isSelected: boolean;
  handleClick: Dispatch<SetStateAction<number>>;
}

const TabBarItem: FC<TabProps> = (props: TabProps) => {
  const { id, children, isSelected, handleClick } = props;
  return (
    <div
      className={`w-full cursor-pointer rounded-[6px] border px-4 py-2 text-center uppercase transition-all duration-300 [word-spacing:-8px] ${
        isSelected
          ? "border-custom-yellow/70 bg-custom-yellow/10 text-custom-yellow shadow-[0_0_18px_rgba(255,186,33,0.18)]"
          : "border-white/10 bg-white/[0.035] text-white/55 hover:border-[#ff3d9a]/55 hover:text-white hover:shadow-[0_0_16px_rgba(255,61,154,0.12)]"
      }`}
      onClick={() => handleClick(id)}
    >
      {children}
    </div>
  );
};
export default TabBarItem;