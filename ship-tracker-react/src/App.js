import React, { Component } from "react";
import axios from "axios";

const Shipment = ({ id, trackingNumber, job }) =>
  <div className="shipment">
    <div className="shipment__job-number">
      Job#: {job.id}
    </div>
    <div className="shipment__tracking-number">
      Tracking#: {trackingNumber}
    </div>
  </div>;

class App extends Component {
  state = {
    selectedCompanyId: null,
    companies: [],
    shipments: []
  };

  componentDidMount() {
    axios.get("/companies").then(res => {
      this.setState({
        companies: res.data
      });
    });
  }

  queryShipmentsForCompany = ({ id }) => {
    axios.get(`/companies/${id}/shipments`).then(res => {
      this.setState({
        shipments: res.data
      });
    });
  };

  selectCompany = company => {
    this.queryShipmentsForCompany(company);
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
      return (
        <h1 id="selected-company">
          {company.title}
        </h1>
      );
    }
  };

  // Shipments
  renderShipments = () => {
    return (
      <div className="shipments">
        <h2>Shipments</h2>
        {this.state.shipments.map(s => <Shipment key={s.id} {...s} />)}
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
