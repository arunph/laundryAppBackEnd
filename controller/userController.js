const asyncHandler = require('express-async-handler')
const users = require('../model/userModel')
const services = require('../model/servicesModel')
const setOrderDetails = require('../model/orderDetails')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await users.findOne({ email })

    if (!user) {
        res.status(400)
        throw new Error('user doesnt exist')
    }
    else {
        if (user.email === email && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ status: 'true', token: generateToken(user._id) });
        } else {
            res.status(200).json({ status: 'false', message: 'Incorrect email or password' });
        }
    }


})

const setUserDetail = asyncHandler(async (req, res) => {
    const { email, password, phoneno, name } = req.body
    if (!email || !password || !phoneno || !name) {
        res.status(200).json({ status: 'false', message: 'Please fill in all required fields' });
        return;
    }

    try {
        const isUserAlreadyExist = await users.findOne({ email });

        if (isUserAlreadyExist) {
            res.status(200).json({ status: 'false', message: 'User already exists' });
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const userRes = await users.create({
                name,
                email,
                password: hashedPassword,
                phoneno,
            });

            if (userRes) {
                res.status(200).json({ status: 'true', message: 'User registered successfully!', token: generateToken(userRes._id) });
            } else {
                res.status(500).json({ status: 'false', message: 'Failed to register user' });
            }
        }
    } catch (error) {
        console.error('Error creating user or writing document:', error.message);
        res.status(500).json({ status: 'false', message: 'Internal server error' });
    }
});

const getServices = asyncHandler(async (req, res) => {
    const servicesData = await services.find();

    if (servicesData && servicesData.length > 0) {
        res.status(200).json(servicesData);
    } else {
        res.status(404).json({ message: 'No services found' });
    }
});

const placeOrder = asyncHandler(async (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //get a token from header
        token = req.headers.authorization.split(' ')[1]

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const response = await setOrderDetails.create({
            userId: decoded.id,
            orders: req.body.orders,
            pickUpDetails: req.body.pickUpDetails
        })

        if (response) {
            res.status(200).json({ status: true, message: 'order placed successfully' })
        }
        else {
            res.status(404).json({ status: 'false', message: 'Something went wrong while placing order.' });
        }
    }
})

const getaccountinformation = asyncHandler(async (req, res) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //get a token from header
        token = req.headers.authorization.split(' ')[1]

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user= await users.findOne({_id:decoded.id})

        if(user){
            const { email, phoneno, name } = user;
            res.status(200).json({ email, phoneno, name })
        } else{
            res.status(404)
            throw new Error({message:'User data not found'})
        }
    }

})


//Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


// const updateGoals = asyncHandler(async (req, res) => {
//     const goal = await Goal.findById(req.params.id)
//     if (!goal) {
//         res.status(400)
//         throw new Error('Goal not found')
//     }

//     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
//         new: true
//     })
//     res.status(200).json(updatedGoal)
// })

// const deleteGoals = asyncHandler(async (req, res) => {
//     const goal = await Goal.deleteOne({_id:req.params.id})

//     if (!goal) {
//         res.status(400)
//         throw new Error(`data doesn't exist`)
//     }
//     res.status(200).json(goal)
// })

module.exports = { setUserDetail, getUser, getServices, placeOrder ,getaccountinformation}