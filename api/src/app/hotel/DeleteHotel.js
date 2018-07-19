const Operation = require('src/app/Operation');

class DeleteHotel extends Operation {
  constructor({ hotelsRepository }) {
    super();
    this.hotelsRepository = hotelsRepository;
  }

  async execute(hotelId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.hotelsRepository.remove(hotelId);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteHotel.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteHotel;
