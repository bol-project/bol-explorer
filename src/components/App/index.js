import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

import Transactions from './../Transactions';
import Transaction from './../Transaction';
import Blocks from './../Blocks';
import Block from './../Block';
import Addresses from './../Addresses';
import Address from './../Address';
import Home from './../Home';
import Header from './Header'
import Footer from './Footer'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Block Explorer</h2>
                </div>

                <Header/>

                <div className="App-nav">
                    <Router>
                        <div>

                            <Route exact path="/" component={Home}/>

                            <Route path="/transactions/:page" component={Transactions}/>
                            <Route exact path="/transactions" render={() => (
                                <h3>Transactions page not found!</h3>
                            )}/>
                            <Route path="/transaction/:transactionHash" component={Transaction}/>
                            <Route exact path="/transaction" render={() => (
                                <h3>Please select a transactionHash!</h3>
                            )}/>

                            <Route path="/blocks/:page" component={Blocks}/>
                            <Route exact path="/blocks" render={() => (
                                <h3>Blocks page not found!</h3>
                            )}/>
                            <Route path="/block/:blockHash" component={Block}/>
                            <Route exact path="/block" render={() => (
                                <h3>Please select a blockHash!</h3>
                            )}/>

                            <Route path="/addresses/:page" component={Addresses}/>
                            <Route exact path="/addresses" render={() => (
                                <h3>Addresses page not found!</h3>
                            )}/>
                            <Route path="/address/:addressHash" component={Address}/>
                            <Route exact path="/address" render={() => (
                                <h3>Please select an addressHash!</h3>
                            )}/>

                        </div>
                    </Router>
                </div>

                <br/>
                <br/>
                <Footer/>
            </div>
        );
    }
}
export default App;