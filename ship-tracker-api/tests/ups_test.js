const ups = require("../services/ups");

let status = ups.getStatusForTrackingNumber("1Z343AX00176634804");

console.log(status);

var shipit = require("shipit");
{
  UpsClient
} = require 'shipit'

ups = new UpsClient
  licenseNumber: '4D29F68D7FDB5438'
  userId: 'tomlangton'
  password: '!Gse^mxYBd@d'


  ups.requestData {trackingNumber: '1Z343AX00176634804'}, (err, result) ->
    console.log "[ERROR] error retrieving tracking data #{err}" if err?
    console.log "[DEBUG] new tracking data received #{JSON.stringify(result)}" if result?
