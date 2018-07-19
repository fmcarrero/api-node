const Operation = require('src/app/Operation');

class GetAllHotels extends Operation {
  constructor({ hotelsRepository }) {
    super();
    this.hotelsRepository = hotelsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const hotels = await this.hotelsRepository.getAll();
      this.emit(SUCCESS, hotels);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllHotels.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllHotels;
