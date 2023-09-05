import React from "react"
import {Link} from "react-router-dom";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import "../../assets/css/nucleo-icons.css";

class TransactionListElement extends React.Component {

    constructor(){
        super();

        this.state = {};

    }

    render() {
        //TODO: this.props.item.timestamp comes as null
        var dtFormat = Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return (

            <div className="list-element">
                <Row>
                    <Col sm>
                        <span>{this.props.item.type}</span>
                    </Col>
                    <Col sm>
                        <Link to={"/transaction/" + this.props.item.txid}>
                            <span>{this.props.item.txid}</span>
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