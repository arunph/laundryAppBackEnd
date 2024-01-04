const express = require('express')
const { getUser } = require('../controller/userController')
const router = express.Router()
// const { protect } = require('../middleware/authMiddleware')

router.post('/',getUser)

module.exports = router