const { expect } = require('chai');
const UpdateHotel = require('src/app/hotel/UpdateHotel');

describe('App :: User :: UpdateHotel', () => {
  var updateHotel;

  context('when hotel exists', () => {
    context('when data is valid', () => {
      before(() => {
        const MockHotelsRepository = {
          update: (id, data) => Promise.resolve(data)
        };

        updateHotel = new UpdateHotel({
            hotelsRepository: MockHotelsRepository
        });
      });

      it('updates the hotel and emits SUCCESS', (done) => {
        const hotelData = { name: 'Updated hotel' };

        updateHotel.on(updateHotel.outputs.SUCCESS, (response) => {
          expect(response.name).to.equal('Updated hotel');
          done();
        });

        updateHotel.execute(123, hotelData);
      });
    });

    context('when data is invalid', () => {
      before(() => {
        const MockHotelsRepository = {
          update: () => Promise.reject(Error('ValidationError'))
        };

        updateHotel = new UpdateHotel({
            hotelsRepository: MockHotelsRepository
        });
      });

      it('emits VALIDATION_ERROR with the error', (done) => {
        const hotelData = { name: 'New Hotel' };

        updateHotel.on(updateHotel.outputs.VALIDATION_ERROR, (response) => {
          expect(response.message).to.equal('ValidationError');
          done();
        });

        updateHotel.execute(321, hotelData);
      });
    });
  });

  context('when the hotel does not exist', () => {
    before(() => {
      const MockHotelsRepository = {
        update: () => Promise.reject(new Error('NotFoundError'))
      };

      updateHotel = new UpdateHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      const hotelData = { name: 'New Hotel' };

      updateHotel.on(updateHotel.outputs.NOT_FOUND, (response) => {
        expect(response.message).to.equal('NotFoundError');
        done();
      });

      updateHotel.execute(123, hotelData);
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockHotelsRepository = {
        update: () => Promise.reject(new Error('Some Error'))
      };

      updateHotel = new UpdateHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const hotelData = { name: 'New Hotel' };

      updateHotel.on(updateHotel.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      updateHotel.execute(321, hotelData);
    });
  });
});