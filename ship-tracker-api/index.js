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

app.get("/companies/:id/shipments", (req, res) => {
  company.getShipments(req.params.id).then(shipments => {
    let updatedShipments = [];
    shipments.forEach(s => {
      s.updateShippingInfo(() => {
        updatedShipments.push(s);
        if (shipments.length == updatedShipments.length) {
          res.send(updatedShipments);
        }
      });
    });
  });
});

app.listen(3000);
