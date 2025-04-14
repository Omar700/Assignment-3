/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Create the list of Debit items
  const debitsView = () => {
    const { debits } = props;
    return debits.map((debit, index) => {
      let date = debit.date.slice(0, 10);
      return (
        <li key={index}>
          ${debit.amount.toFixed(2)} {debit.description} {date}
        </li>
      );
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDebit = {
      description: description,
      amount: parseFloat(amount),
      date: new Date().toISOString()
    };
    props.addDebit(newDebit);
    setDescription('');
    setAmount('');
  };

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <h3>Account Balance: ${props.accountBalance.toFixed(2)}</h3>

      <ul>{debitsView()}</ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          name="amount"
          value={amount}
          step="0.01"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;