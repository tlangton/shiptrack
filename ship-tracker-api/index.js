const express = require("express");
const app = express();
// import module for querying companies and shipments
const db = require("./models");
const { company, job, shipment } = require("./models");
const excel = require("./services/excel");

app.use(express.static(__dirname + "/build"));

app.get("/companies", (req, res) => {
  company.findAll().then(companies => {
    res.send(companies);
  });
});

app.get("/companies/:id/shipments", (req, res) => {
  company.getShipments(req.params.id).then(shipments => {
    if (!shipments || shipments.length === 0) {
      return res.send([]);
    }
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

app.get("/companies/:id/shipments/excel", (req, res) => {
  company.getShipments(req.params.id).then(shipments => {
    const doc = excel.generateExcelForShipments(shipments);
    res.setHeader("Content-Type", "application/vnd.openxmlformats");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Report.xlsx"
    );
    res.end(doc, "binary");
  });
});

app.listen(3000);
