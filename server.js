/*
 * Server File
 */

// Dependencies
var express = require('express');
var app = express();
var helmet = require('helmet');
var bodyParser = require('body-parser');
var logger = require('logger').createLogger('./logs/development.log');

// Core modules
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

// Helper files
var config = require('./helpers/config');
var routes = require('./routes/main');

// Server
var server = {};

server.init = function() {
  // Helmet for security
  app.use(helmet());

  // View engine
  app.set('view engine', 'pug');
  app.use(express.static(path.join(__dirname, 'public')));

  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Routes
  app.use('/', routes);

  // HTTP Server
  http.createServer(app).listen(config.httpPort, () => {
    if (config.name === 'development') {
      let message = `We have a ${config.name} server running on PORT: ${
        config.httpPort
      }`;
      logger.info(message);
      console.log(message);
    }
  });

  // HTTPS Server
  https
    .createServer(
      {
        cert: fs.readFileSync('./ssl/server.cert'),
        key: fs.readFileSync('./ssl/server.key')
      },
      app
    )
    .listen(config.httpsPort);
};

module.exports = server;
