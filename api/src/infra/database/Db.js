const Mongoose = require('mongoose');

class Db {

  init(dbUrl) {
    const URL = process.env.MONGO_URL || dbUrl;
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