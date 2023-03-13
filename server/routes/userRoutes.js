const express = require('express')

const router = express.Router();

router.route('/').post()
router.route('/register').post()

module.exports=router