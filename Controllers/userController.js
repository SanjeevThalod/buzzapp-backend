const User = require('../Models/userModel');
const Creater = require('../Models/userCreaterModel');
const generateToken = require('../Config/jwt');

const register = async (req,res) =>{
  const {name,email,password} = req.body;
  if(!name || !email || !password){
    res.status(400).json('ERROR: Enter all the filds');
  }
  const userExists = await User.findOne({email:email});

  if(userExists){
    res.status(409).json('Error: email alredy in use');
  }

  const createUser = await User.create({
    name,email,password
  });

  if(createUser){
    res.status(201).json({Success:"User Created",token:generateToken(createUser._id),_id:createUser._id,name:createUser.name,cohorts:createUser.cohorts,email:createUser.email});
  }else{
    res.status(400).json("Error: Couldn't create User");
  }
};

const auth = async(req,res)=>{
  const {email,password} = req.body;

  if(!email || !password){
    res.status(400).json({Error:'Enter all fileds'});
  }

  const findEmail = await User.findOne({email:email});

  if(findEmail && (findEmail.password === password)){
    res.status(201).json({Success:'LoggedIn' ,token:generateToken(findEmail._id),_id:findEmail._id,name:findEmail.name,cohorts:findEmail.cohorts,email:findEmail.email});
  }else{
    res.status(400).json('Could not login');
  }
}

const authCreater = async (req,res)=>{
  const {email,password} = req.body;

  const findEmail = await Creater.findOne({email:email});

  if(findEmail && (findEmail.password == password)){
    res.status(200).json({Success:'Creater Verified',token:generateToken(findEmail._id),_id:findEmail._id,name:findEmail.name,topic:findEmail.topic,link:findEmail.link});
  }else{
    res.status(400).json({Error:'Could not verify creater'});
  }

}

const addCohort = async (req, res) => {
  const { userId, createrId } = req.body;
  try {
    const findUser = await User.findById(userId);
    const findCreater = await Creater.findById(createrId);

    if (!findUser || !findCreater) {
      return res.status(404).json({ error: 'User or Creater not found' });
    }
    // Check if the creater is already added to cohorts
    const isCreaterAlreadyAdded = findUser.cohorts.some(cohort => cohort.creater && cohort.creater.equals(createrId));
    if (isCreaterAlreadyAdded) {
      return res.status(409).json({ error: 'Creater is already added to cohorts' });
    }

    const newCohort = {
      creater: findCreater._id,
      name: findCreater.name,
      email: findCreater.email,
      topic: findCreater.topic,
      link: findCreater.link
    };

    findUser.cohorts.push(newCohort);
    await findUser.save();

    res.status(201).json({ Success: 'Cohort Added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {register,auth,authCreater,addCohort}