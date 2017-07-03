import React, { Component } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";

var trackBase =
  "https://wwwapps.ups.com/WebTracking/processRequest?TypeOfInquiryNumber=T&InquiryNumber1=";
const STATUSES = {
  2: "In Transit",
  4: "Delivered",
  5: "Attempted Delivery"
};

function renderStatusID(statusID) {
  return STATUSES[statusID];
}

const Shipment = ({ id, trackingNumber, job, status }) =>
  <div className="shipment">
    <div className="shipment__job-number">
      Job#: {job.id}
    </div>
    <div className="shipment__tracking-number">
      Tracking#: {trackingNumber}{" "}
      <a
        href={`http://www.ups.com/WebTracking/processInputRequest?tracknum=${trackingNumber}`}
        target="_blank"
      >
        Track
      </a>
    </div>
    <div className="status">
      {renderStatusID(status)}
    </div>
  </div>;

class CompaniesAutosuggest extends Component {
  state = {
    suggestions: [],
    value: ""
  };

  renderSuggestion = company => {
    return (
      <div>
        {company.title}
      </div>
    );
  };

  componentWillReceiveProps = ({ companies }) => {
    this.setState({
      suggestions: companies
    });
  };

  getSuggestionValue = company => company.title;

  onSuggestionsFetchRequested = ({ value }) => {
    const query = value.toLowerCase();
    const queryLength = query.length;
    const suggestions =
      query === ""
        ? this.props.companies
        : this.props.companies.filter(
            company =>
              company.title.toLowerCase().slice(0, queryLength) === query
          );

    this.setState({
      suggestions
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.didSelectCompany(suggestion);
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: this.props.companies
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Company Name",
      value,
      onChange: this.onChange,
      onClick: () => {
        this.setState({ value: "" });
        this.onSuggestionsClearRequested();
      }
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        focusInputOnSuggestionClick={false}
        shouldRenderSuggestions={() => true}
      />
    );
  }
}

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
    } else {
      return <h1>Select A Company</h1>;
    }
  };

  // Shipments
  renderShipments = () => {
    const { selectedCompanyId } = this.state;
    return (
      <div className="shipments">
        <h2>Shipments</h2>
        {selectedCompanyId
          ? <a
              href={`/companies/${selectedCompanyId}/shipments/excel`}
              target="_blank"
            >
              Download Excel
            </a>
          : ""}
        {this.state.shipments.map(s => <Shipment key={s.id} {...s} />)}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        {this.renderSelectedCompany()}
        <CompaniesAutosuggest
          companies={this.state.companies}
          didSelectCompany={this.selectCompany}
        />
        <hr />
        {this.renderShipments()}
      </div>
    );
  }
}

export default App;
