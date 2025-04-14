/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  }

  // Add new credit and recalculate balance
  addCredit = (newCredit) => {
    const updatedCredits = [...this.state.creditList, newCredit];
    const totalCredits = updatedCredits.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebits = this.state.debitList.reduce((sum, debit) => sum + debit.amount, 0);
    const newBalance = totalCredits - totalDebits;
    this.setState({
      creditList: updatedCredits,
      accountBalance: newBalance
    });
  }

  // Add new debit and recalculate balance
  addDebit = (newDebit) => {
    const updatedDebits = [...this.state.debitList, newDebit];
    const totalCredits = this.state.creditList.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebits = updatedDebits.reduce((sum, debit) => sum + debit.amount, 0);
    const newBalance = totalCredits - totalDebits;
    this.setState({
      debitList: updatedDebits,
      accountBalance: newBalance
    });
  }

  // Fetch credits and debits, then calculate initial balance
  async componentDidMount() {
    const creditsRes = await fetch("https://johnnylaicode.github.io/api/credits.json");
    const debitsRes = await fetch("https://johnnylaicode.github.io/api/debits.json");
    const credits = await creditsRes.json();
    const debits = await debitsRes.json();

    const totalCredits = credits.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebits = debits.reduce((sum, debit) => sum + debit.amount, 0);
    const balance = totalCredits - totalDebits;

    this.setState({
      creditList: credits,
      debitList: debits,
      accountBalance: balance
    });
  }

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    );

    return (
      <Router basename="/Assignment-3">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;

