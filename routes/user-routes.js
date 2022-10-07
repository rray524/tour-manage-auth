const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken')

router.route('/login').post(userController.loginUser)
router.route('/me').get(verifyToken, userController.getMe)
router.route('/').post(userController.createUser)



module.exports = router;