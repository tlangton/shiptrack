const app = require("express")();
// import module for querying companies and shipments

app.get("/companies", (req, res) => {
  // this should return a list of companies
  res.send("HI");
});

app.get("/companies/:id/shipments", (req, res) => {
  let companyId = req.params.id;
  // this should return a list of shipments for a given company
  // shipments = ShipmentsService.shipmentsForCompany(companyId)
  res.send(`shipments for company #${companyId}`);
});

app.listen(3000, () => console.log("Listening on Port 3000"));
