const Operation = require('src/app/Operation');

class UpdateHotel extends Operation {
  constructor({ hotelsRepository }) {
    super();
    this.hotelsRepository = hotelsRepository;
  }

  async execute(HotelId, hotelData) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.outputs;

    try {
      const hotel = await this.hotelsRepository.update(HotelId, hotelData);
      this.emit(SUCCESS, hotel);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }
}

UpdateHotel.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateHotel;
