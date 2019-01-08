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
  var id = parseInt(req.params.id);
  console.log(id);
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {

    var obj = JSON.parse(data);
    finaldata = Object.values(obj);

    show = finaldata.filter(dd => dd.id === id)
    console.log(show[0]);

    showfinal = {};

    showfinal[`user${id}`] = show[0];
    console.log(showfinal);
    res.send(showfinal);
    res.end();
  });


});
app.post('/addMultiUser', function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, dataFile) {

    var data = JSON.parse(dataFile);
    var count = Object.keys(data).length;
    var dataUser = req.body

    dataUser.map((user, index) => {
      data[`user${count + index + 1}`] = {
        name: user.name,
        password: user.password,
        profession: user.profession,
        id: count + (index + 1)
      }
      return data
    })
    res.end(JSON.stringify(data));
  });
});

app.post('/addUser', function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, dataFile) {
    var data = JSON.parse(dataFile);
    var count = Object.keys(data).length;
    var dataUser = req.body
    dataUser.id = count + 1
    data[`user${count + 1}`] = dataUser

    res.end(JSON.stringify(data));
  });
})

app.delete('/deleteUser/:id', function (req, res) {
  var id = parseInt(req.params.id)
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, dataFile) {
    var data = JSON.parse(dataFile);
    var convertData = Object.values(data);
    var deletedData = convertData.filter(dd => dd.id !== id)

    res.end(JSON.stringify(deletedData));
  })
});


var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Sample Code for RESTful API run at ", port)
})