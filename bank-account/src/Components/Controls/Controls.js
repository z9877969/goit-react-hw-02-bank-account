import React from 'react';
import PropTypes from 'prop-types';
import style from './controls.module.css';

const Controls = ({ amount, onInputChange, onControlBtn }) => (
  <section className={style.controls}>
    <div className={style.container}>
      <input type="number" value={amount} onChange={onInputChange} />
      <button type="button" onClick={onControlBtn} data-action="deposit">
        Deposit
      </button>
      <button type="button" onClick={onControlBtn} data-action="withdraw">
        Withdraw
      </button>
    </div>
  </section>
);

Controls.propTypes = {
  amount: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onControlBtn: PropTypes.func.isRequired,
};

export default Controls;
