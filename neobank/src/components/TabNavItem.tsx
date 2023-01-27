import React from "react";

import "../styles/TabNavItem.css";

interface TabNavProps {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabNavItem = ({ id, title, activeTab, setActiveTab }: TabNavProps) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li onClick={handleClick} className={activeTab === id ? "active-tab" : ""}>
      {title}
    </li>
  );
};
export default TabNavItem;
