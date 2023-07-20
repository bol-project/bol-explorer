import React from "react"
import {Link} from "react-router-dom";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

class AccountListElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

        return (
            <div className="list-element">
                <Row>
                    <Col sm>
                        <span>{this.props.item.codename}</span>
                    </Col>
                    <Col sm>
                        <Link to={"/account/" + this.props.item.accountHash}>
                            <span>{this.props.item.accountHash}</span>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default AccountListElement