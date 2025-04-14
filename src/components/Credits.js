/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Credits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCredit = {
      description: description,
      amount: parseFloat(amount),
      date: new Date().toISOString()
    };
    props.addCredit(newCredit);
    setDescription('');
    setAmount('');
  };

  const creditsView = props.credits.map((credit, index) => {
    let date = credit.date.slice(0, 10);
    return (
      <li key={index}>
        {credit.description} - ${credit.amount.toFixed(2)} on {date}
      </li>
    );
  });

  return (
    <div>
      <h1>Credits</h1>
      <h3>Account Balance: ${props.accountBalance.toFixed(2)}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Credit</button>
      </form>

      <ul>{creditsView}</ul>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
