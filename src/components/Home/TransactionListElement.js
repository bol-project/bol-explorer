import React from "react"
import {Link} from "react-router-dom";

class TransactionListElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

        var completedOn = new Date(this.props.item.completedOn).toLocaleString();


        return (
            <Link to={"/transaction/" + this.props.item.transactionId}>
                <div className="list-element">
                    Type: {this.props.item.type} Transaction ID: {this.props.item.transactionId} Completed On: {completedOn}
                </div>
            </Link>

        )
    }

}

export default TransactionListElement