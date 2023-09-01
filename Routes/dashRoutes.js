const express = require('express');
const authenticate = require('../Middleware/authenticate');
const { fetchData, updateLink } = require('../Controllers/dashController');
const router = express.Router();

router.post('/cohorts',authenticate,fetchData);
router.put('/update',authenticate,updateLink)

module.exports = router;