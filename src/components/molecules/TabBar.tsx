import { FC, useEffect, useState } from "react";
import { TabBarItem } from "@components";

interface TabBarProps {
  tabs: string[];
  handleTabChange: (tab: number) => void;
}
const TabBar: FC<TabBarProps> = (props: TabBarProps) => {
  const { tabs, handleTabChange } = props;
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    handleTabChange(tab);
  }, [handleTabChange, tab]);

  return (
    <div className="rounded-[8px] border border-white/10 bg-[#050607]/80 shadow-[0_0_24px_rgba(255,61,154,0.08)] backdrop-blur-sm flex flex-row gap-1.5 items-center p-1.5 w-min whitespace-nowrap">
      {tabs.map((item, index) => (
        <TabBarItem
          key={index}
          id={index}
          isSelected={tab === index}
          handleClick={setTab}
        >
          {item}
        </TabBarItem>
      ))}
    </div>
  );
};

export default TabBar;
