const { expect } = require('chai');
const GetAllHotels = require('src/app/hotel/GetAllHotels');

describe('App :: Hotel :: GetAllHotels', () => {
  var getAllHotels;

  context('when query is successful', () => {
    before(() => {
      const MockHotelsRepository = {
        getAll: () => Promise.resolve('Imagine all the hotels...')
      };
     
      getAllHotels = new GetAllHotels({
        hotelsRepository: MockHotelsRepository
      });
    });
    
    it('emits SUCCESS with all the hotels', (done) => {
        getAllHotels.on(getAllHotels.outputs.SUCCESS, (response) => {
        expect(response).to.equal('Imagine all the hotels...');
        done();
      });      
       const data = {
           name : "hotel",
           stars : 1
       }
       const hotelData = { query : data };
      getAllHotels.execute(hotelData);
    });
  });

   context('when there is an internal error', () => {
     before(() => {
       const MockHotelsRepository = {
         getAll: () => Promise.reject(new Error('Failed'))
       };

       getAllHotels = new GetAllHotels({
         hotelsRepository: MockHotelsRepository
       });
     });

     it('emits ERROR with the error', (done) => {
        getAllHotels.on(getAllHotels.outputs.ERROR, (response) => {
         expect(response.message).to.equal('Failed');

        done();
       });
       const hotelData = { query :{ } };
       getAllHotels.execute(hotelData);
     });
   });
});