const { createContainer, Lifetime ,asValue ,asClass ,asFunction} = require('awilix');
const { scopePerRequest } = require('awilix-express');

const Application = require('./app/Application');
const {
  CreateHotel,
  GetAllHotels,
  GetHotel,
  UpdateHotel,
  DeleteHotel
} = require('./app/hotel');


const config = require('../config');
const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const HotelRepository = require('./infra/hotel/HotelRepository');
const hotel  = require('./infra/database/models/Hotel');

const container = createContainer();

// System
container
  .register({
     app: asClass(Application, { lifetime: Lifetime.SINGLETON }),
    server: asClass (Server, { lifetime: Lifetime.SINGLETON })
  })
  .register({
    router: asFunction(router, { lifetime: Lifetime.SINGLETON }),
    logger: asFunction(logger, { lifetime: Lifetime.SINGLETON })
  })
  .register({ config : asValue(config) })
  ;

// Middlewares
container
  .register({
    loggerMiddleware: asFunction (loggerMiddleware, { lifetime: Lifetime.SINGLETON })
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue ( errorHandler ),
    swaggerMiddleware: asValue (swaggerMiddleware)
  });

// Repositories
container.register({
  hotelsRepository: asClass(HotelRepository, { lifetime: Lifetime.SINGLETON })
});

// Database

container.register({ 
  hotelModel : asFunction(hotel)
});

// Operations
container.register({
  createHotel: asClass (CreateHotel),
  getAllHotel: asClass (GetAllHotels),
  getHotel:    asClass (GetHotel),
  updateHotel: asClass (UpdateHotel),
  deleteHotel: asClass (DeleteHotel)
});



module.exports = container;
