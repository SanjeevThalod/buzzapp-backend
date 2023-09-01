const creaters = require('../Models/userCreaterModel');

const fetchData = async (req,res)=>{
  try {
    const data = await creaters.find();
    res.status(200).json(data);
  } catch (error) {
    throw new Error(error);
  }
}

const updateLink = async (req,res)=>{
  const {createrId,newLink} = req.body;
  try {
    const creater = await creaters.findById(createrId);
    creater.link = newLink;
    await creater.save();
    res.status(200).json({Success:'Link Updated'});
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
}

module.exports = {fetchData,updateLink}