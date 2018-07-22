const mongoose = require('mongoose').set('debug', true);
module.exports = () => {
    const hotel = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        name: {
            type: String,
            required: true
        },
        stars: {
            type: Number
        },
        price: {
            type: Number
        },
        image: {
            type: String
        },
        amenities: {
            type: [String]
        }
    });
    
  
    const hotelr = mongoose.model('Hotel', hotel);  
    return hotelr;
  };

