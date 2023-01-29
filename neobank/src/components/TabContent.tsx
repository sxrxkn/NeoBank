import React from "react";

import { TabContentProps } from "../models";

const TabContent = ({ id, activeTab, children }: TabContentProps) => {
  return activeTab === id ? <div className="TabContent">{children}</div> : null;
};

export default TabContent;
