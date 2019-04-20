import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import TransactionListElement from "../Home/TransactionListElement";

class Transactions extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        var transactionActivityData = [{type: 'Invocation', transactionId: '50b9ccaef0f9306eba1b34fbd9a66aa1365dbf8b9b9085e206310eff458db370', completedOn: 1551338586},
            {type: 'Invocation', transactionId: '13e5c967c76158f4ea197094f4e7fd47ad2165f223f4131564aa6e4bcb34a069', completedOn: 1551338586},
            {type: 'Invocation', transactionId: 'd75d22aa4fe1788e201db2f191a0459285d072ca423e429a51e6d26e2f61c3d4', completedOn: 1551338586},
            {type: 'Invocation', transactionId: 'ada996ad33ad98fbe3524e2b46e7bff3d4e3952f37c20ec273350d9a5eae70bb', completedOn: 1551338586},
            {type: 'Invocation', transactionId: '4d84ba1b1f9003d121fd2480420e3d36b3451d0fbb9806fde6dd62f23294ba38', completedOn: 1551338586}];
        this.state.transactionActivityList = transactionActivityData.map(item => <TransactionListElement key={item.transactionId} item={item}/>)


        return(
            <div className="table-list">

                <h1>All transactions</h1>

                {this.state.transactionActivityList}

                <br/>
                <br/>
                <Link to={`/transactions/${ parseInt(this.props.match.params.page) + 1}`}>Next Page</Link>
            </div>
        );
    }

}

export default Transactions;