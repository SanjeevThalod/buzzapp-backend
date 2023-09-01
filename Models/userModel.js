const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cohorts: [
    {
      creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'creaters' // Reference the collection name in the database
      },
      name: String,    // This should be of type String
      email: String,   // This should be of type String
      topic: String,   // This should be of type String
      link: String
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;