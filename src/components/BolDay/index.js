import React, { Component } from "react";
import { Link } from "react-router-dom";
import BolContext from "../../bolContext";

import "./style.css";

class BolDay extends Component {
  static contextType = BolContext;

  constructor() {
    super();
    this.state = {};
  }

  async componentDidUpdate(nextProps) {
    if (this.props.match.params.bolDay === nextProps.match.params.bolDay) {
      return;
    }
    await this.fetchBolDay();
    await this.currentBolDay();
  }

  async componentDidMount() {
    await this.fetchBolDay();
    await this.currentBolDay();
  }

  async fetchBolDay() {
    const client = this.context;
    const bolDayIndex = parseInt(this.props.match.params.bolDay);

    var bolDay = await client.getBolDay(bolDayIndex);
    this.setState({ bolDay });
  }

  async currentBolDay() {
    const client = this.context;
    var height = Number(await client.getBlockHeight()) - 1;
    var currentBolDay = await client.getBlockDay(height);

    this.setState({ currentBolDay });
  }

  render() {
    const bolDay = this.state.bolDay;
    const currentBolDay = this.state.currentBolDay;

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
                  <td className="tdLabel">Total Supply:</td>
                  <td>{bolDay?.TotalSupply}</td>
                </tr>
                <tr>
                  <td className="tdLabel">World Population:</td>
                  <td>
                    {Math.floor(
                      Number(bolDay?.Population?.replace(",", ".") ?? 0)
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="tdLabel">Total Individual Accounts:</td>
                  <td>{bolDay?.TotalRegisteredPersons ?? "0"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Link
          className={bolDay?.Day > 0 ? "" : "invisible"}
          to={`/bolDay/${bolDay?.Day - 1}`}>Previous
        </Link>
        <span> </span>
        <Link 
          className={bolDay?.Day <currentBolDay ? "" : "invisible"}
          to={`/bolDay/${bolDay?.Day + 1}`}>Next
        </Link>
      </div>
    );
  }
}

export default BolDay;
