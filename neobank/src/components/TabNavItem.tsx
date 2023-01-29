import React from "react";

import { TabNavProps } from "../models";

import "../styles/TabNavItem.css";

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
