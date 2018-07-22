const { expect } = require('chai');
const GetHotel = require('src/app/hotel/GetHotel');

describe('App :: hotel :: GetHotel', () => {
  let getHotel;

  context('when hotel exists', () => {
    beforeEach(() => {
      const MockHotelsRepository = {
        getById: (hotelId) => Promise.resolve({
          id: hotelId,
          name: 'The Hotel'
        })
      };

      getHotel = new GetHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('emits SUCCESS with the hotel', (done) => {
      getHotel.on(getHotel.outputs.SUCCESS, (hotel) => {
        expect(hotel.id).to.equal(123);
        expect(hotel.name).to.equal('The Hotel');
        done();
      });

      getHotel.execute(123);
    });
  });
  
  context('when hotel does not exist', () => {
    beforeEach(() => {
      const MockHotelsRepository = {
        getById: () => Promise.reject({
          details: 'hotel with id 123 can\'t be found.'
        })
      };

      getHotel = new GetHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      getHotel.on(getHotel.outputs.NOT_FOUND, (error) => {
        expect(error.details).to.equal('hotel with id 123 can\'t be found.');
        done();
      });

      getHotel.execute(123);
    });
  });
});