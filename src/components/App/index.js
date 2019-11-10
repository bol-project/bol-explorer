import React, { Component } from 'react';
import logo from './logo.svg';

import './style.css';


import PageHeader from "components/PageHeader/PageHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

import Transactions from './../Transactions';
import Transaction from './../Transaction';
import Blocks from './../Blocks';
import Block from './../Block';
import Addresses from './../Addresses';
import Address from './../Address';
import WorldPopulationDays from './../WorldPopulationDays';
import TotalCommunityDays from './../TotalCommunityDays';
import Accounts from './../Accounts';
import Account from './../Account';
import Distributions from './../Distributions';

import Home from './../Home';


import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import NavbarDocs from "../Navbars/NavbarDocs";

class App extends Component {
    componentDidMount() {
        document.body.classList.toggle("index-page");
    }
    componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }

    render() {
        return (
            <div className="App">
                <div className="App-nav">
                    <Router>
                        <div>

                            <NavbarDocs />

                            <div className="wrapper">


                                <div className="main">

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

                                    <Route path="/WPD/:page" component={WorldPopulationDays}/>
                                    <Route exact path="/WPD" render={() => (
                                        <h3>Current page not found!</h3>
                                    )}/>

                                    <Route path="/TCP/:page" component={TotalCommunityDays}/>
                                    <Route exact path="/TCP" render={() => (
                                        <h3>Current page not found!</h3>
                                    )}/>

                                    <Route path="/accounts/:page" component={Accounts}/>
                                    <Route exact path="/accounts" render={() => (
                                        <h3>Accounts page not found!</h3>
                                    )}/>
                                    <Route path="/account/:accountHash" component={Account}/>
                                    <Route exact path="/account" render={() => (
                                        <h3>Please select an accountHash!</h3>
                                    )}/>

                                    <Route path="/D/:page" component={Distributions}/>
                                    <Route exact path="/D" render={() => (
                                        <h3>D page not found!</h3>
                                    )}/>
                                </div>

                                <Footer/>
                            </div>

                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}
export default App;