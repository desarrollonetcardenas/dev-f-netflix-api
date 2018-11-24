const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

process.env.NODE_ENV = "test";

const config = {
    db: {
        test: "mongodb://admin:coppel123@ds261440.mlab.com:61440/testnetflix"
    },
    connection: null
};

function connect() {
    return new Promise((resolve, reject) => {
        if( config.connection ) {
            return resolve();
        }

        const mongoUri = "mongodb://admin:coppel123@ds261440.mlab.com:61440/testnetflix";

        mongoose.Promise = Promise;

        const options = {
            server: {
                auto_connect: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000
            }
        };

        mongoose.connect( mongoUri, options );
        config.connection = mongoose.connection;

        config.connection
              .once("open", resolve)
              .on("error", (error) => {
                  if( error.message.code === 'ETIMEDOUT' ) {
                      console.log(error);
                      mongoose.connect( mongoUri, options );
                  }

                  console.log( error );
                  reject( error );
              });

    });
}

function clearDatabase() {
    return new Promise((resolve, reject) => {

        let count = 0;
        let max = Object.keys( mongoose.connection.collections ).length;


        for (const i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function(){
                count++;
                if( count >= max ) {
                    resolve();
                }
            });
        }

    });
}

module.exports = async function setupTest() {
    await connect();
    await clearDatabase();
}

/**
 * mlab.com

 * Database hosting
 */
