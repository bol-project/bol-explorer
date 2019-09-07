import React from "react"
import {Link} from "react-router-dom";
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";

class BlockListElement extends React.Component {

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
                        <Link to={"/block/" + this.props.item.blockHash}>
                            <span>{this.props.item.blockHeight}</span>
                        </Link>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.size}</span>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.numberOfTransactions}</span>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.blockProducer}</span>
                    </Col>
                    <Col sm>
                        <span>{dtFormat.format(this.props.item.timestamp)}</span>
                    </Col>
                </Row>
            </div>

        )
    }

}

export default BlockListElement