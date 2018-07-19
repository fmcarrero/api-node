
const Hotel = require('../database/models/Hotel');
class SequelizeHotelRepository {
  constructor({ HotelModel }) {
    this.HotelModel = HotelModel;
  }

  async getByExpression(req) {
    const finder = {};
    let { name, stars } = req.query;
    if (name) {
      finder.name = new RegExp(name, 'ig');
    } else if (stars) {
      finder.stars = Number(stars);
    }
    const hotels = await Hotel.find(finder);
    return hotels;
  }


  async getAll() {
    const hotels = await Hotel.find({});
    return hotels;
  }

  async   getById(id) {
    const hotel = await Hotel.findById(id)
    return hotel;

  }

  async add(hotel) {
    const newHotel = await  Hotel.create(hotel);
    return newHotel;
  }

  async remove(id) {
    const hotel = await Hotel.findById(id).remove();   
    return hotel;
  }

  async update(id, newData) {
    const hotel = await Hotel.findByIdAndUpdate(id, newData);
    return hotel;
  }

 
 
}

module.exports = SequelizeHotelRepository;
