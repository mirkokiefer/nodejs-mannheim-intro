
var express = require('express')
var browserify = require('browserify-middleware')
var path = require('path')

var app = express()

app.use(app.router)
app.use(express.static(__dirname + '/../public'))

app.get('/', function(req, res) {
  res.send({status: 'running'})
})

app.get('/app/app.js', browserify(__dirname + '/../src/app.js'))

app.get('/app/*', function(req, res) {
  var filePath = path.resolve(__dirname, '../templates/app.html')
  res.sendfile(filePath)
})

var port = 3000
app.listen(port)

console.log('started on port ' + port)