const express=require('express')
const router=express.Router()
const {getaccountinformation}=require('../controller/userController')

router.get('/',getaccountinformation)

module.exports=router