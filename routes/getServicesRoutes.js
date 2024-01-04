const express = require('express')
const router = express.Router()
const { getServices } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/',protect,getServices)

module.exports=router
