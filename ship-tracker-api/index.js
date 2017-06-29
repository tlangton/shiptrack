const express = require("express");
const app = express();
// import module for querying companies and shipments
const db = require("./models");
const { company, job, shipment } = require("./models");

app.use(express.static(__dirname + "/build"));

app.get("/companies", (req, res) => {
  company.findAll().then(companies => {
    res.send(companies);
  });
});

app.get("/companies/jobs", (req, res) => {
  company
    .findAll({
      include: [{ model: job }]
    })
    .then(jobs => res.send(jobs));
});

app.get("/companies/:id/shipments", (req, res) => {
  let companyId = req.params.id;
  // this should return a list of shipments for a given company
  // shipments = ShipmentsService.shipmentsForCompany(companyId)
  res.send(`shipments for company #${companyId}`);
});

app.listen(3000);
