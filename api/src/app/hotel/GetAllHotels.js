const Operation = require('src/app/Operation');

class GetAllHotels extends Operation  {
  constructor({ hotelsRepository }) {
    super();
    this.hotelsRepository = hotelsRepository;
  }

  async execute(req ) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      let { name, stars } = req.query;
        const filter = {};
        if(name) {
          filter.name = new RegExp(name, 'ig');
        }
        if(stars){
          filter.stars = { $in: stars }
        }
      const hotels = await this.hotelsRepository.getAll(filter);
      this.emit(SUCCESS, hotels);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllHotels.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllHotels;
