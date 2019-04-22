import React from "react"
import {Link} from "react-router-dom";

class AccountListElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

        return (
            <Link to={"/account/" + this.props.item.accountHash}>
                <div className="list-element">
                    Codename: {this.props.item.codename} Hash: {this.props.item.accountHash}
                </div>
            </Link>

        )
    }

}

export default AccountListElement