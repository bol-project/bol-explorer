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

        var date = new Date(this.props.item.time).toLocaleString();
        console.log(date)

        return (

            <div className="list-element">
                <Row>
                    <Col sm>
                        <Link to={"/block/" + this.props.item.hash}>
                            <span>{this.props.item.height}</span>
                        </Link>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.size}</span>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.transactions}</span>
                    </Col>
                    <Col sm>
                        <span>{this.props.item.producer}</span>
                    </Col>
                    <Col sm>
                        <span>{date}</span>
                    </Col>
                </Row>
            </div>

        )
    }

}

export default BlockListElement