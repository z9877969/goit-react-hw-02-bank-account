import React from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import style from './dashboard.module.css';

class Dashboard extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    transactions: [],
    balance: 0,
    amount: '',
    deposit: 0,
    withdraw: 0,
  };

  notifyAmountNull = () =>
    toast('Введите сумму для проведения операции!', {
      containerId: 'amountControl',
    });

  notifyNotWithdraw = () =>
    toast('На счету недостаточно средств для проведения операции!', {
      containerId: 'amountControl',
    });

  notifyInputInvalid = () =>
    toast(`Введена не корректная сумма ${this.state.amount}. Повторите ввод!`, {
      containerId: 'amountControl',
    });

  handleInputChange = ({ target }) => {
    const { value } = target;
    const amountInput = Number(value) >= 0 ? value : String(Math.abs(value));

    return this.setState({
      amount: amountInput,
    });
  };

  handleControlBtn = ({ target }) => {
    const timeTransaction = new Date();
    const { amount } = this.state;
    const exp = /^0\d+/g;
    const transaction = {
      id: shortid.generate(),
      amount: Number(amount),
      time: timeTransaction.toLocaleString(),
    };

    if (!Number(amount)) {
      return this.notifyAmountNull();
    }

    if (exp.test(amount)) {
      this.setState({ amount: '' });
      return this.notifyInputInvalid();
    }

    if (target.dataset.action === 'deposit') {
      transaction.type = 'deposit';
      this.setState(prev => ({
        balance: prev.balance + Number(amount),
        deposit: prev.deposit + Number(amount),
      }));
    } else if (target.dataset.action === 'withdraw') {
      if (this.state.amount > this.state.balance) {
        return this.notifyNotWithdraw();
      }

      transaction.type = 'withdraw';

      this.setState(prev => ({
        balance: prev.balance - Number(amount),
        withdraw: prev.withdraw + Number(amount),
      }));
    }

    return this.setState(prev => ({
      transactions: [transaction, ...prev.transactions],
      amount: '',
    }));
  };

  render() {
    const { amount, deposit, withdraw, balance, transactions } = this.state;

    return (
      <div className={style.dashboard}>
        <Controls
          amount={amount}
          onInputChange={this.handleInputChange}
          onControlBtn={this.handleControlBtn}
        />
        <Balance deposit={deposit} withdraw={withdraw} balance={balance} />
        <TransactionHistory transactions={transactions} />
        <ToastContainer
          enableMultiContainer
          containerId="amountControl"
          position={toast.POSITION.BOTTOM_RIGHT}
        />
      </div>
    );
  }
}

export default Dashboard;
