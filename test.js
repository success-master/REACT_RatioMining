var request = require("request");
var options = {
  method: 'PUT',
  url: 'https://ratioback.tk/vehicletype/2',
  headers: {'content-type': 'application/json'},
  body: {
    name: 'Excavator - Loader',
    properties: {
        rules:{
            reffuel:"100",
            refloadspeed:"100",
            capacity:"100"
        }
    },
    parent: null
  },
  json: true
};
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});