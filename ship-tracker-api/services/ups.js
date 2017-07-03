const { UpsClient } = require("shipit");

let upsClient = new UpsClient({
  licenseNumber: "4D29F68D7FDB5438",
  userId: "tomlangton",
  password: "!Gse^mxYBd@d"
});

function getTrackingInfo(trackingNumber, callback) {
  console.log("getting tracking info for " + trackingNumber);
  upsClient.requestData({ trackingNumber }, (err, result) => {
    if (err) {
      console.log(`[ERROR] error retrieving tracking data ${err}`);
      callback(null);
    } else {
      callback(result);
    }
  });
}

module.exports = {
  getTrackingInfo
};

// 2 in transit -- on time?
// 4 delivered
// 5 [first] delivery attempt made
//
