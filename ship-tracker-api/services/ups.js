const { UpsClient } = require("shipit");

let upsClient = new UpsClient({
  licenseNumber: "4D29F68D7FDB5438",
  userId: "tomlangton",
  password: "!Gse^mxYBd@d"
});

function getTrackingInfo(trackingNumber, callback) {
  upsClient.requestData({ trackingNumber }, (err, result) => {
    if (err) {
      console.log(`[ERROR] error retrieving tracking data ${err}`);
    } else {
      callback(result);
    }
  });
}

function testDetails() {
  getTrackingInfo("1Z879E930346834440", data => console.log(data));
}

module.exports = {
  getTrackingInfo,
  testDetails
};
