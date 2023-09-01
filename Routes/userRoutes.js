const express = require('express');
const authenticate = require('../Middleware/authenticate');
const {register,auth,authCreater,addCohort} = require('../Controllers/userController');
const router = express.Router();

router.post('/signup',register);
router.post('/login',auth);
router.post('/login/creater',authCreater);
router.put('/add/cohorts',authenticate,addCohort);

module.exports = router;