var express = require('express');
var fs = require('fs')
var bodyParser = require("body-parser");
app = express();
app.use(bodyParser.json())
app.get('/listUsers', function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    console.log(data)
    res.end(data)
  })
});
app.get('/showbyID/:id', function (req, res) {
  var id =parseInt(req.params.id);
  console.log(id);
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {

    var obj = JSON.parse(data);
    finaldata = Object.values(obj);

    show = finaldata.filter(dd => dd.id===id)
    console.log(show[0]);
   
    showfinal={};
    showfinal[`user$id`]=show[0];
       console.log(showfinal);
       res.send(showfinal);
       res.end();
  });


});


var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Sample Code for RESTful API run at ", port)
})