const mongoose = require('mongoose')

const servicesSchema = mongoose.Schema({
    id: {
        type: String
    },
    image: {
        type: String
    },
    name: {
        type: String
    },
    quantity: {
        type: String
    },
    price: {
        type: String
    }
})

module.exports=mongoose.model('services',servicesSchema)
