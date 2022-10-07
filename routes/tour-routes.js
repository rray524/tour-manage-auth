const express = require('express')
const router = express.Router()
const tourController = require('../controllers/tour.controller')
const authorization = require('../middlewares/authorization')
const verifyToken = require('../middlewares/verifyToken')


router.route('/trending').get(tourController.getTrendingTour)
router.route('/cheapest').get(tourController.getCheapestTour)
router.route('/:id').get(tourController.getTour)
router.route('/:id').patch(tourController.updateTour)

router.route('/').post(verifyToken, authorization("admin"), tourController.createTour).get(tourController.getTours)




module.exports = router;
