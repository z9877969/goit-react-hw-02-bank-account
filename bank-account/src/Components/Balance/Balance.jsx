import React from 'react';
import PropTypes from 'prop-types';
import style from './balance.module.css';

const Balance = ({ deposit, withdraw, balance }) => (
  <section className={style.balance}>
    <p>
      <span className={style.arrowUp}>⬆</span>
      <span>{(Math.round(deposit * 100) / 100).toFixed(2)}$</span>
    </p>
    <p>
      <span className={style.arrowDown}>⬇</span>
      <span>{(Math.round(withdraw * 100) / 100).toFixed(2)}$</span>
    </p>
    <span className={style.container}>
      Balance: {(Math.round(balance * 100) / 100).toFixed(2)}$
    </span>
  </section>
);

Balance.propTypes = {
  deposit: PropTypes.number.isRequired,
  withdraw: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;
