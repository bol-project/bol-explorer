import React from "react"
import {Link} from "react-router-dom";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import "../../assets/css/nucleo-icons.css";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from "react-super-responsive-table";
class TransactionBlockListElement extends React.Component {

    constructor(){
        super();

        this.state = {};

    }

    render() {

        return (

            
                <Tr>
                    <Td className="long-word-cell">
                        <span>{this.props.item.type}</span>
                    </Td>
                    <Td className="long-word-cell">
                        <Link to={"/transaction/" + this.props.item.txid}>
                            <span>{this.props.item.txid}</span>
                        </Link>
                    </Td>
                </Tr>
               
        )
    }

}

export default TransactionBlockListElement