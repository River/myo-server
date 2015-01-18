// var express = require('express');
// var app = express();
//
// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));
//
// app.get('/', function(request, response) {
//   response.send('Hello World!');
// });
//
// app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'));
// });

var http = require('http');
var fs = require('fs');

var stateFile = 'state'

http.createServer(function (req, res) {
  url = req.url;

  if (url == '/read') {
    fs.readFile(stateFile, function(err, data) {
      fs.writeFile(stateFile, '0');
      console.log("Read " + data + " and reset");
      res.end(data);
    });
  } else if (url.substring(0,6) == '/write') {
    var writeString = url.substring(7);
    fs.writeFile(stateFile, writeString);
    console.log("Write " + writeString);
    res.end(writeString);
  } else {
    res.end('Not found');
  }

}).listen(process.env.PORT || 5000);
