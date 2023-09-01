const mongoose = require('mongoose');

const createrSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  topic:{
    type:String,
    required:true,
  },
  link:{
    type:String,
    required:true
  }
});

const Creater = mongoose.model('Creater',createrSchema);

module.exports = Creater;