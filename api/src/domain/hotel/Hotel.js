const { attributes } = require('structure');

const Hotel = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  } 
})(class Hotel {
  isLegal() {
    return this.id <=0;
  }
});



module.exports = Hotel;
