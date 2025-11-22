const mongoose = require('mongoose');
require('dotenv').config(); 

/* Connect to the Test Database 
   NOTE: This now expects a real Atlas URI provided in .env or CI secrets
*/
const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('⚠️ Test failed: MONGO_URI is not defined. Check your .env file.');
    }

    // Connect to Atlas
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas Test DB');
  }
};

/* Close the connection */
const close = async () => {
  if (mongoose.connection.readyState !== 0) {
    // We drop the database to ensure the next test run starts fresh
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
};

/* Clear all data from the database */
const clear = async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
};

module.exports = { connect, close, clear };