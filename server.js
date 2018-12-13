/*
 * Dependencies
 */
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var logger = require('logger').createLogger('./logs/development.log');
var app = express();

// Includes
var config = require('./config.js');

// Helmet for security
app.use(helmet());

// View engine
app.set('view engine', 'pug');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// HTTP Server
http.createServer(app)
  .listen(config.httpPort, () => {
    
    if(config.name === 'development') {
      let message = `We have a ${config.name} server running on PORT: ${config.httpPort}`;
      logger.info(message);
      console.log(message);
    }

  });

// HTTPS Server
https.createServer({
  cert: fs.readFileSync('./ssl/server.cert'),
  key: fs.readFileSync('./ssl/server.key')
}, app)
  .listen(config.httpsPort);