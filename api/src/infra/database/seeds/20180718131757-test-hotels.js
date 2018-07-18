'use strict';


module.exports = {
  up: function (queryInterface) {
    const testHotels = [];
    testHotels.push({
      name: 'marriot'   
    });
    testHotels.push({
      name: 'bogota dc'   
    });
    return queryInterface.bulkInsert('hotels', testHotels, {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('hotels', null, {});
  }
};
