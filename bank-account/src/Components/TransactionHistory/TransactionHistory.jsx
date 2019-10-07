import React from 'react';
import PropTypes from 'prop-types';

import style from './transactionHistory.module.css';

const TransactionHistory = ({ transactions }) => (
  <table className={style.history}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(transaction => (
        <tr key={transaction.id}>
          <td>{transaction.type}</td>
          <td>
            {(Math.round(Math.abs(transaction.amount) * 100) / 100).toFixed(2)}$
          </td>
          <td>{transaction.time}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TransactionHistory;
