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

        var dtFormat = Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});


        return (

            <div className="list-element">
                <Row>
                    <Col sm>
                        <span>{this.props.item.type}</span>
                    </Col>
                    <Col sm>
                        <Link to={"/transaction/" + this.props.item.id}>
                            <span>{this.props.item.id}</span>
                        </Link>
                    </Col>
                    <Col sm>
                        <span>{dtFormat.format(this.props.item.timestamp)}</span>
                    </Col>
                </Row>
               </div>
        )
    }

}

export default TransactionListElement