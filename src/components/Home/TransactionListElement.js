import React from "react"
import {Link} from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import "assets/css/nucleo-icons.css";

class TransactionListElement extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    render() {

        var timestamp = new Date(this.props.item.timestamp).toLocaleString();


        return (

            <div className="list-element">
                <Row>
                    <Col sm>
                        <span>{this.props.item.type}</span>
                    </Col>
                    <Col sm>
                        <Link to={"/transaction/" + this.props.item.transactionID}>
                            <span>{this.props.item.transactionID}</span>
                        </Link>
                    </Col>
                    <Col sm>
                        <span>{timestamp}</span>
                    </Col>
                </Row>
               </div>
        )
    }

}

export default TransactionListElement