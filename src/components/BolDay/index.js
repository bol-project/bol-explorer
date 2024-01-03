import React, { Component } from "react";
import { Link } from "react-router-dom";
import BolContext from "../../bolContext";

import "./style.css";

class BolDay extends Component {
  static contextType = BolContext;
  _isMounted = false;

  constructor() {
    super();
    this.state = {};
  }

  async componentDidUpdate (nextProps) {
      if(this.props.match.params.bolDay === nextProps.match.params.bolDay){
          return;
      }
      await this.fetchBolDay();
   }

  async componentDidMount() {
    await this.fetchBolDay();
  }

  async fetchBolDay() {
    const client = this.context;
    const bolDayIndex = parseInt(this.props.match.params.bolDay);

    var bolDay = await client.getBolDay(bolDayIndex);
    this.setState({ bolDay });
  }

  render() {
    const bolDay = this.state.bolDay;
    return (
      <div className="view-page">
        <div className="Block">
          <h2>Bol Day</h2>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="tdLabel">Bol day:</td>
                  <td>{bolDay?.Day}</td>
                </tr>
                <tr>
                  <td className="tdLabel">Closing Block:</td>
                  <td>
                    <Link to={"/block/" + bolDay?.Block}>
                      <span>{bolDay?.Block}</span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="tdLabel">Distribute Per Person:</td>
                  <td>{bolDay?.DistributePerPerson}</td>
                </tr>
                <tr>
                  <td className="tdLabel">New BoL Produced:</td>
                  <td>{bolDay?.NewBol}</td>
                </tr>
                <tr>
                  <td className="tdLabel">World Wallet Amount:</td>
                  <td>{bolDay?.TotalSupply}</td>
                </tr>
                <tr>
                  <td className="tdLabel">World Population:</td>
                  <td>{bolDay?.Population ?? "0"}</td>
                </tr>
                <tr>
                  <td className="tdLabel">Total Registered Persons:</td>
                  <td>{bolDay?.TotalRegisteredPersons ?? "0"}</td>
                </tr>
                <tr>
                  <td className="tdLabel">Total Registered Companies:</td>
                  <td>{bolDay?.TotalRegisteredCompanies ?? "0"}</td>
                </tr>
                <tr>
                  <td className="tdLabel">Total Registered Certifiers:</td>
                  <td>{bolDay?.TotalCertifiers ?? "0"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Link
          className={bolDay?.Day > 0 ? "" : "invisible"}
          to={`/bolDay/${bolDay?.Day - 1}`}
        >
          Previous
        </Link>
        <span> </span>
        <Link to={`/bolDay/${bolDay?.Day + 1}`}>Next</Link>
      </div>
    );
  }
}

export default BolDay;
