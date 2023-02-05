import React from "react";
import { SortConfig, TableData } from "../models";

export const useSortableData = (items: TableData[], config = null) => {
  const [sortConfig, setSortConfig] = React.useState<null | SortConfig>(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (
          a[sortConfig.key as keyof TableData] <
          b[sortConfig.key as keyof TableData]
        ) {
          return sortConfig.direction === "descending" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof TableData] >
          b[sortConfig.key as keyof TableData]
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "descending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    }

    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
