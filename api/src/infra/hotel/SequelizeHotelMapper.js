const Hotel = require('src/domain/hotel/Hotel');

const SequelizeHotelMapper = {
  toEntity({ dataValues }) {
    const { id, name } = dataValues;

    return new Hotel({ id, name });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeHotelMapper;
