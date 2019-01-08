var http = require("http");

http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  // status code 200 : request successed
  res.write("Hello my world");
  res.end();
}).listen(8080);

console.log("Server is running at localhost:8080")