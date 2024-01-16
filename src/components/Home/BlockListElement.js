import React from "react"
import {Link} from "react-router-dom";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";


class BlockListElement extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {

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
                <Link to={"/block/" + this.props.item.hash}>
                  <span>{this.props.item.index}</span>
                </Link>
              </Td>
              <Td>
                <span>{this.props.item.size}</span>
              </Td>
              <Td>
                <span>
                  {(this.props.item.tx && this.props.item.tx.length)
                    ? this.props.item.tx.length
                    : 0}
                </span>
              </Td>
              <Td>
                <span>{this.props.item.nextconsensus}</span>
              </Td>
              <Td>
                <span>
                  {(!this.props.item.time)
                    ? ""
                    : dtFormat.format(
                        new Date(0).setUTCSeconds(this.props.item.time)
                      )}
                </span>
              </Td>
            </Tr>
          );
    }

}

export default BlockListElement