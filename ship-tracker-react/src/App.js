import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {};

  componentDidMount() {
    axios.get("/companies").then(res => {
      this.setState({
        companies: res.data
      });
    });
  }

  renderCompany(company) {
    return (
      <h3 key={company.id}>
        {company.title}
      </h3>
    );
  }

  renderCompanies() {
    if (this.state.companies) {
      return (
        <div className="companies">
          {this.state.companies.map(this.renderCompany)}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderCompanies()}
      </div>
    );
  }
}

export default App;
