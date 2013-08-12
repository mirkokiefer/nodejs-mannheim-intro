
var express = require('express')
var underscore = require('underscore')
var fs = require('fs')
var browserify = require('browserify-middleware')
var app = express()

app.use(express.bodyParser())
app.use(app.router)
app.use(express.static('public'))

app.get('/', function(req, res){
  res.send('Hello World')
})

app.get('/app/app.js', browserify('src/app.js'))

app.get('/app/*', function(req, res) {
  res.sendfile('templates/app.html')
})

app.listen(3000)
