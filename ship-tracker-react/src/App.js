import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    selectedCompanyId: 2,
    companies: [],
    shipments: []
  };

  componentDidMount() {
    axios.get("/companies").then(res => {
      this.setState({
        companies: res.data
      });
    });
    this.queryShipmentsForCompany({ id: 2 });
  }

  queryShipmentsForCompany = ({ id }) => {
    axios.get(`/companies/${id}/shipments`).then(res => {
      this.setState({
        shipments: res.data
      });
    });
  };

  selectCompany = company => {
    this.setState({
      selectedCompanyId: company.id
    });
  };

  renderCompany = company => {
    return (
      <h3
        key={company.id}
        onClick={() => {
          this.selectCompany(company);
        }}
        className="company"
      >
        {company.title}
      </h3>
    );
  };

  // Companies
  renderCompanies = () => {
    if (this.state.companies) {
      return (
        <div className="companies">
          {this.state.companies.map(this.renderCompany)}
        </div>
      );
    }
  };

  getSelectedCompany = () => {
    let { companies, selectedCompanyId } = this.state;
    return companies.find(c => c.id === selectedCompanyId);
  };

  renderSelectedCompany = () => {
    let company = this.getSelectedCompany();
    if (company) {
      return <h1 id="selected-company" />;
    }
  };

  // Shipments
  renderShipment = shipment => {
    return (
      <div className="shipment">
        {shipment.id}
        <br />
        {shipment.trackingNumber}
      </div>
    );
  };

  renderShipments = () => {
    return (
      <div className="shipments">
        <h2>Shipments</h2>
        {this.state.shipments.map(this.renderShipment)}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        {this.renderSelectedCompany()}
        {this.renderCompanies()}
        <hr />
        {this.renderShipments()}
      </div>
    );
  }
}

export default App;
