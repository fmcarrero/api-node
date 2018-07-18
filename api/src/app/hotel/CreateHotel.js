const Operation = require('src/app/Operation');
const Hotel = require('src/domain/hotel/Hotel');

class CreateHotel extends Operation {
  constructor({ HotelsRepository }) {
    super();
    this.HotelsRepository = HotelsRepository;
  }

  async execute(HotelData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const Hotel = new Hotel(HotelData);

    try {
      const newHotel = await this.HotelsRepository.add(Hotel);

      this.emit(SUCCESS, newHotel);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateHotel.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateHotel;
