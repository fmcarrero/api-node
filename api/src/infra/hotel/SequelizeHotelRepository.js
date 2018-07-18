const HotelMapper = require('./SequelizeHotelMapper');

class SequelizeHotelRepository {
  constructor({ HotelModel }) {
    this.HotelModel = HotelModel;
  }

  async getAll(...args) {
    const hotels = await this.HotelModel.findAll(...args);

    return hotels.map(HotelMapper.toEntity);
  }

  async getById(id) {
    const hotel = await this._getById(id);

    return HotelMapper.toEntity(hotel);
  }

  async add(hotel) {
    const { valid, errors } = hotel.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newHotel = await this.HotelModel.create(HotelMapper.toDatabase(hotel));
    return HotelMapper.toEntity(newHotel);
  }

  async remove(id) {
    const hotel = await this._getById(id);

    await hotel.destroy();
    return;
  }

  async update(id, newData) {
    const hotel = await this._getById(id);

    const transaction = await this.HotelModel.sequelize.transaction();

    try {
      const updatedHotel = await hotel.update(newData, { transaction });
      const hotelEntity = HotelMapper.toEntity(updatedHotel);

      const { valid, errors } = hotelEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return hotelEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.HotelModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.HotelModel.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Hotel with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeHotelRepository;
