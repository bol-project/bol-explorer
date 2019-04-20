import React from "react"
import {Link} from "react-router-dom";

class AddressListElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

        var created = new Date(this.props.item.created).toLocaleString();


        return (
            <Link to={"/address/" + this.props.item.addressId}>
                <div className="list-element">
                    Address Id: {this.props.item.addressId} Created: {created} Transactions: {this.props.item.transactions}
                    Last transaction: {this.props.item.lastTransaction} Tokens: {this.props.item.tokens}
                </div>
            </Link>

        )
    }

}

export default AddressListElement