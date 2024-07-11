import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function History() {
  const { transactionHistory } = useGlobalContext();
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const history = transactionHistory();

  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => {
      if (sortBy === "amount") {
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      if (sortBy === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  }, [history, sortBy, sortDirection]);

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortDirection("asc");
    }
  };

  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      <div className="sort-buttons">
        <button onClick={() => handleSort("amount")}>Sort by Amount</button>
        <button onClick={() => handleSort("date")}>Sort by Date</button>
      </div>
      {sortedHistory.map((item) => {
        const { _id, title, amount, type, date } = item;
        return (
          <div key={_id} className="history-item">
            <div className="history-details">
              <p
                className="title"
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {title}
              </p>
              <p className="date">{new Date(date).toLocaleDateString()}</p>
            </div>
            <p
              className="amount"
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {type === "expense"
                ? `-${amount <= 0 ? 0 : amount}`
                : `+${amount <= 0 ? 0 : amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .sort-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: var(--color-green);
      color: white;
    }
  }

  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .history-details {
      display: flex;
      flex-direction: column;

      .title {
        margin: 0;
        font-weight: bold;
      }

      .date {
        margin: 0;
        font-size: 0.8rem;
        color: gray;
      }
    }

    .amount {
      font-weight: bold;
    }
  }
`;

export default History;
