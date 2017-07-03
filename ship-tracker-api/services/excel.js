var nodeExcel = require("excel-export-impr");

function generateRowsForShipments(shipments) {
  return shipments.map(s => [
    s.trackingNumber,
    {
      text: "Track",
      href:
        "http://www.ups.com/WebTracking/processInputRequest?tracknum=" +
        s.trackingNumber
    }
  ]);
}

function generateExcelForShipments(shipments) {
  var conf = {};
  conf.cols = [
    {
      caption: "Tracking Number",
      type: "string"
    },
    {
      caption: "link",
      type: "hyperlink"
    }
  ];
  conf.rows = generateRowsForShipments(shipments);
  return nodeExcel.execute(conf);
}

module.exports = {
  generateExcelForShipments
};
