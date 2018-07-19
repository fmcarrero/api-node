const { Router } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');

module.exports = ({  containerMiddleware, loggerMiddleware, errorHandler, swaggerMiddleware }) => {
  const router = Router();
  const apiRouter = Router();
  // parse application/x-www-form-urlencoded
 
  apiRouter.use(bodyParser.urlencoded({ extended: false }));
  
  
  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())   
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);
 

  apiRouter.use('/hotels', controller('hotel/HotelController'));

  router.use('/api', apiRouter);

  router.use(errorHandler);

  return router;
};
