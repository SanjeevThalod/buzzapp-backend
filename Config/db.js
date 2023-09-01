const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_KEY;

const db = async () => {
  try {
    const connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Mongo Connected: ${connection.connection.host}`);
  }
  catch (error) {
    console.log('Error: ',error);
    process.exit();
  }
}

module.exports = db;