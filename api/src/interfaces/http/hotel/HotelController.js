const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const HotelController = {
  get router() {
    const router = Router();

    router.get('/', inject('getAllHotel'), this.index);
    router.get('/:id', inject('getHotel'), this.show);
    router.post('/', inject('createHotel'), this.create);
    router.put('/:id', inject('updateHotel'), this.update);
    router.delete('/:id', inject('deleteHotel'), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllHotel } = req;
    const { SUCCESS, ERROR } = getAllHotel.outputs;

    getAllHotel
      .on(SUCCESS, (hotels) => {
        res
          .status(Status.OK)
          .json(hotels);
      })
      .on(ERROR, next);

      getAllHotel.execute();
  },

  show(req, res, next) {
    const { getHotel } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getHotel.outputs;

    getHotel
      .on(SUCCESS, (hotel) => {
        res
          .status(Status.OK)
          .json(hotel);
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);      
      getHotel.execute(req.params.id);
  },

  create(req, res, next) {
    const { createHotel } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createHotel.outputs;

    createHotel
      .on(SUCCESS, (hotel) => {
        res
          .status(Status.CREATED)
          .json(hotel);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);      
      createHotel.execute(req.body);
  },

  update(req, res, next) {
    const { updateHotel } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateHotel.outputs;

    updateHotel
      .on(SUCCESS, (hotel) => {
        res
          .status(Status.ACCEPTED)
          .json(hotel);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);     
      updateHotel.execute(req.params.id, req.body);
  },

  delete(req, res, next) {
    const { deleteHotel } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = deleteHotel.outputs;

    deleteHotel
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

      deleteHotel.execute(req.params.id);
  }
};

module.exports = HotelController;
