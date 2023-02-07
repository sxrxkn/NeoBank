import React, { useEffect, useState } from "react";

import { TableData } from "../models";

import { getStatus } from "../utils/api";
import { useSortableData } from "../utils/hooks";

import "../styles/Table.css";

function Table() {
  const [sortStates, setSortStates] = useState({
    number: "ascending",
    date: "ascending",
    totalPayment: "ascending",
    interestPayment: "ascending",
    debtPayment: "ascending",
    remainingDebt: "ascending",
  });
  const [table, setTable] = useState<TableData[] | []>([]);
  const { items, requestSort, sortConfig } = useSortableData(table);

  const isPostedPrescoring = JSON.parse(
    localStorage.getItem("isPostedPrescoring") || "{}"
  );

  useEffect(() => {
    getStatus(isPostedPrescoring.id).then((data) => {
      setTable(data.data.credit.paymentSchedule);
    });
  }, [isPostedPrescoring.id]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th
            onClick={() => {
              requestSort("number");
              setSortStates((prevState) => {
                return {
                  ...prevState,
                  [sortConfig?.key as keyof TableData]:
                    sortConfig?.direction as keyof TableData,
                };
              });
            }}
            className={sortStates.number}
          >
            NUMBER
          </th>
          <th
            onClick={() => {
              requestSort("date");
              setSortStates((prevState) => {
                return {
                  ...prevState,
                  [sortConfig?.key as keyof TableData]:
                    sortConfig?.direction as keyof TableData,
                };
              });
            }}
            className={sortStates.date}
          >
            DATE
          </th>
          <th
            onClick={() => {
              requestSort("totalPayment");
              setSortStates((prevState) => {
                return {
                  ...prevState,
                  [sortConfig?.key as keyof TableData]:
                    sortConfig?.direction as keyof TableData,
                };
              });
            }}
            className={sortStates.totalPayment}
          >
            TOTAL PAYMENT
          </th>
          <th
            onClick={() => {
              requestSort("interestPayment");
              setSortStates((prevState) => {
                return {
                  ...prevState,
                  [sortConfig?.key as keyof TableData]:
                    sortConfig?.direction as keyof TableData,
                };
              });
            }}
            className={sortStates.interestPayment}
          >
            INTEREST PAYMENT
          </th>
          <th
            onClick={() => {
              requestSort("debtPayment");
              setSortStates((prevState) => {
                return {
                  ...prevState,
                  [sortConfig?.key as keyof TableData]:
                    sortConfig?.direction as keyof TableData,
                };
              });
            }}
            className={sortStates.debtPayment}
          >
            DEBT PAYMENT
          </th>
          <th
            onClick={() => {
              requestSort("remainingDebt");
              setSortStates((prevState) => {
                return {
                  ...prevState,
                  [sortConfig?.key as keyof TableData]:
                    sortConfig?.direction as keyof TableData,
                };
              });
            }}
            className={sortStates.remainingDebt}
          >
            REMAINING DEBT
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((data: TableData) => {
          return (
            <tr key={data.number}>
              <td>{data.number}</td>
              <td>{data.date}</td>
              <td>{data.totalPayment}</td>
              <td>{data.interestPayment}</td>
              <td>{data.debtPayment}</td>
              <td>{data.remainingDebt}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
