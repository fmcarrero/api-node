
class HotelRepository {

  constructor({hotelModel}) {
    this.hotelModel =hotelModel;
  }

  async getAll(filter) {
    const hotels = await this.hotelModel.find(filter);
    return hotels;
  }

  async   getById(id) {
    const hotel = await this.hotelModel.findById(id)
    return hotel;

  }

  async add(hotel) {
    const newHotel = await  this.hotelModel.create(hotel);
    return newHotel;
  }

  async remove(id) {
    const hotel = await this.hotelModel.findById(id).remove();   
    return hotel;
  }

  async update(id, newData) {
    const hotel = await this.hotelModel.findByIdAndUpdate(id, newData);
    return hotel;
  } 
}

module.exports = HotelRepository;
