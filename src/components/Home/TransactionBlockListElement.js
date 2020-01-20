import React from "react"
import {Link} from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import "assets/css/nucleo-icons.css";

class TransactionBlockListElement extends React.Component {

    constructor(){
        super();

        this.state = {};

    }

    render() {

        return (

            <div className="list-element">
                <Row>
                    <Col sm>
                        <span>{this.props.item.value}</span>
                    </Col>
                    <Col sm>
                        <Link to={"/transaction/" + this.props.item.key}>
                            <span>{this.props.item.key}</span>
                        </Link>
                    </Col>
                </Row>
               </div>
        )
    }

}

export default TransactionBlockListElement