// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  res.json({unix : new Date().getTime(), utc : new Date().toUTCString() })
})

app.get("/api/:date", function(req, res) {
  const { date } = req.params;

  let utcDate, unix;
  let valid = false;

  if(Number.isNaN(Number(date))){
  // the date provided converted is not a number
    unix = new Date(date).getTime()
    utcDate = new Date(date).toUTCString()
    if(!isNaN(unix)){
      valid = true
    }
  }else{
    unix = Number(date)
    utcDate = new Date(date.slice(0,10) * 1000).toUTCString()
    if(!isNaN(unix)){
      valid = true
    }
  }

  let response = valid ? {unix: unix , utc: `${utcDate}` } : {error: "Invalid Date"}

  res.json(response);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
