
const Hotel = require('../database/models/Hotel');
class HotelRepository {
  constructor() {}

  async getAll(filter) {
    const hotels = await Hotel.find(filter);
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

module.exports = HotelRepository;
