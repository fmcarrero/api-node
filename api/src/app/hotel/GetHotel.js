const Operation = require('src/app/Operation');

class GetHotel extends Operation {
  constructor({ hotelsRepository }) {
    super();
    this.hotelsRepository = hotelsRepository;
  }

  async execute(hotelId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const hotel = await this.hotelsRepository.getById(hotelId);
      this.emit(SUCCESS, hotel);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetHotel.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetHotel;
