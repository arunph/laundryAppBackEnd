const mongoose = require('mongoose')

const userRegisterationSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add name'],
    },
    email: {
        type: String,
        required: [true, 'please add a email'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'please add password']
    },
    phoneno: {
        type: String,
        required: [true, 'please add phone no']
    }
}, {
    timestamps: true
})

module.exports=mongoose.model('test',userRegisterationSchema)