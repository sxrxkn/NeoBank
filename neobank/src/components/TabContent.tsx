import React from "react";

interface TabContentProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
}

const TabContent = ({ id, activeTab, children }: TabContentProps) => {
  return activeTab === id ? <div className="TabContent">{children}</div> : null;
};

export default TabContent;
