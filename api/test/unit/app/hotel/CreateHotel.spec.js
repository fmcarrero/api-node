const { expect } = require('chai');
const CreateHotel = require('src/app/hotel/CreateHotel');

describe('App :: Hotel :: CreateHotel', () => {
  var createHotel;

  context('when hotel is valid', () => {
    before(() => {
      const MockHotelsRepository = {
        add: (hotel) => Promise.resolve(hotel)
      };

      createHotel = new CreateHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('creates the hotel and emits SUCCESS', (done) => {
      const hotelData = { name: 'New hotel' };

      createHotel.on(createHotel.outputs.SUCCESS, (response) => {
        expect(response.name).to.equal('New hotel');
        done();
      });

      createHotel.execute(hotelData);
    });
  });

  context('when hotel is invalid', () => {
    before(() => {
      const MockHotelsRepository = {
        add: () => Promise.reject(Error('ValidationError'))
      };

      createHotel = new CreateHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('emits VALIDATION_ERROR with the error', (done) => {
      const hotelData = { name: 'New Hotel' };

      createHotel.on(createHotel.outputs.VALIDATION_ERROR, (response) => {
        expect(response.message).to.equal('ValidationError');
        done();
      });

      createHotel.execute(hotelData);
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockHotelsRepository = {
        add: () => Promise.reject(new Error('Some Error'))
      };

      createHotel = new CreateHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const hotelData = { name: 'New Hotel' };

      createHotel.on(createHotel.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      createHotel.execute(hotelData);
    });
  });
});