const Mongoose = require('mongoose');

class Db {

  init() {
    const URL = process.env.MONGO_URL || "mongodb://userhotel:sistemas31@ds141671.mlab.com:41671/hoteldb_library";
    if (! URL) {
      throw Error(`MongoDB connection url (MONGO_URL) is required, none given.`);
    }

    return this.establishConnection(URL);
  }

  establishConnection(url, options = { useNewUrlParser: true }) {
    var mongoose = Mongoose.connect(url, options)
        .then( () => {
            
            Mongoose.set('debug', (collectionName, method, query, doc) => {
                console.log(`Query: ${collectionName}.${method}`, query);
            });
        })
        .catch( (error) => {
            console.log("Mongoose failed to connect to MongoDB.");
            console.error("Mongoose connection error: ", error);
            process.exit(0);
        });
        mongoose.Promise = global.Promise;
        return mongoose;
    }
};

module.exports = new Db();