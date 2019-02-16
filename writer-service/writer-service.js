/**
* @name Writer
* @summary Writer Hydra Express service entry point
* @description 
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();



let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    return hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1/writer': require('./routes/writer-v1-routes')
      });
      hydra.on('message',(message) => {
        console.log('message reply', message)
      })
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
