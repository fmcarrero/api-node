const { expect } = require('chai');
const DeleteHotel = require('src/app/hotel/DeleteHotel');

describe('App :: Hotel :: DeleteHotel', () => {
  var deleteHotel;

  context('when hotel exists', () => {
    before(() => {
      const MockHotelsRepository = {
        remove: () => Promise.resolve()
      };

      deleteHotel = new DeleteHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('deletes the hotel and emits SUCCESS with no payload', (done) => {
        deleteHotel.on(deleteHotel.outputs.SUCCESS, (response) => {
        expect(response).to.be.undefined();
        done();
      });

      deleteHotel.execute(123);
    });
  });

  context('when the hotel does not exist', () => {
    before(() => {
      const MockHotelsRepository = {
        remove: () => Promise.reject(new Error('NotFoundError'))
      };

      deleteHotel = new DeleteHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
        deleteHotel.on(deleteHotel.outputs.NOT_FOUND, (response) => {
        expect(response.message).to.equal('NotFoundError');
        done();
      });

      deleteHotel.execute(123);
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockHotelsRepository = {
        remove: () => Promise.reject(new Error('Some Error'))
      };

      deleteHotel = new DeleteHotel({
        hotelsRepository: MockHotelsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
        deleteHotel.on(deleteHotel.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      deleteHotel.execute(321);
    });
  });
});