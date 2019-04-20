import React from "react"
import {Link} from "react-router-dom";

class BlockListElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

        var date = new Date(this.props.item.time).toLocaleString();
        console.log(date)

        return (
            <Link to={"/block/" + this.props.item.hash}>
                <div className="list-element">
                    Index: {this.props.item.index} Size: {this.props.item.size} Transactions: {this.props.item.transactions ? this.props.item.transactions.count : 0} version: {this.props.item.version} hash: {this.props.item.hash} Date: {date}
                </div>
            </Link>

        )
    }

}

export default BlockListElement