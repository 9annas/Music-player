'use strict'

const express = require('express')
const dbconnexion = require('./src/server/node-pg')
const app = express()

// parse application/x-www-form-urlencoded
app.use(express.static('dist'))

// app.use(express.urlencoded({ extended: true }))

// CORS for development

// https://enable-cors.org/server_expressjs.html

app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    response.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')

    response.header('Access-Control-Allow-Credentials', 'false')

    next()
})

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
// const CONTENT_TYPE_HTML = 'text/html'

app.get('/genres', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.genreList(function (result) {
        response.end(JSON.stringify(result))
    })
})

app.get('/playlist/:a', function (request, response) {
    console.log('id' + request.params.a)
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    // console.log('id' + request.params.a)
    dbconnexion.showPlayList(parseInt(request.params.a), function (result) {
        response.end(JSON.stringify(result))
    })
})

app.delete('/delete/:a', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.deleteFromPlaylist(parseInt(request.params.a))
    response.end(JSON.stringify(request.params.a))
})

app.put('/ajout/:a/:b/:c/:d', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    dbconnexion.addTrack(parseInt(request.params.a), request.params.b, request.params.c, parseInt(request.params.d))
    console.log(request.params)
    response.end(JSON.stringify(request.params))
})

/* app.get('/datas/:a', function (request, response) {
    const datasContainer = nodeFs.readData(TEST_FILE_NAME, parseInt(request.params.a))
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_HTML })
    response.end('<h1>' + JSON.stringify(datasContainer) + '</h1>')
}) */

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
