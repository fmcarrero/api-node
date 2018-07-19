const Operation = require('src/app/Operation');
const Hotel = require('src/domain/hotel/Hotel');

class CreateHotel extends Operation {
  constructor({ hotelsRepository }) {
    super();
    this.hotelsRepository = hotelsRepository;
  }

  async execute(HotelData) {
    console.log(HotelData);
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;  

    try {
      const newHotel = await this.hotelsRepository.add(HotelData);

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
