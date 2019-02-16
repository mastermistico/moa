/**
* @name Order-ad
* @summary Order-ad Hydra Express service entry point
* @description order ad
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');



let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    return hydraExpress.init(config.getObject(), version, () => {
      const app = hydraExpress.getExpressApp();
      app.engine('pug', require('pug').__express)
      app.set('views', './views');
      app.set('view engine', 'pug');
      hydraExpress.registerRoutes({
        '/v1/order-ad': require('./routes/order-ad-v1-routes')
      });
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
