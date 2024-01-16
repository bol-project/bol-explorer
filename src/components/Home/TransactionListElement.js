import React from "react"
import {Link} from "react-router-dom";
import "../../assets/css/nucleo-icons.css";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";


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
            <Tr>
              <Td>
                <span>{this.props.item.type}</span>
              </Td>
              <Td>
                <Link to={"/transaction/" + this.props.item.txid}>
                  <span>{this.props.item.txid}</span>
                </Link>
              </Td>
              <Td>
                <span>{dtFormat.format(this.props.item.timestamp)}</span>
              </Td>
            </Tr>
          );
        }
      }

export default TransactionListElement