const express = require('express')
const router = express.Router()
const { setUserDetail } = require('../controller/userController')

router.post('/',setUserDetail)

// router.route('/:id').put(updateGoals).delete(deleteGoals)


module.exports = router