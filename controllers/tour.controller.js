const Tour = require("../models/tour-model");
const { createTourService, getAllTourService, getSingleService, getTrendingService, getCheapestService, getUpdateService } = require("../services/tour-service");

// Create a new tour
exports.createTour = async (req, res, next) => {
    try {
        const newTour = await createTourService(req.body);

        res.status(200).json({
            status: "success",
            message: "One New Tour was created successfully",
            data: newTour
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't createTour",
            error: error.message
        })
    }
}

// Find all tours
exports.getTours = async (req, res, next) => {
    try {
        const queries = {}
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')

            queries.fields = fields

        }
        if (req.query.sort) {
            const sort = req.query.sort.split(',').join(' ')

            queries.sort = sort

        }
        if (req.query.page) {
            const { page = 1, limit = 5 } = req.query;
            const skip = (page - 1) * (+limit)
            queries.skip = skip
            queries.limit = +limit

        }
        const tours = await getAllTourService(queries.fields, queries.sort, queries.skip, queries.limit);
        const totalProducts = await Tour.countDocuments(getAllTourService())
        res.status(200).json({
            status: "success",
            message: "All tours found",
            totalProducts: totalProducts,
            data: tours
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't find any tours",
            error: error.message
        })
    }
}
// Get a tour
exports.getTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        // console.log(req.params)
        const tour = await getSingleService(id);

        res.status(200).json({
            status: "success",
            message: "Tour found",
            data: tour
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't find any tours",
            error: error.message
        })
    }
}
// update a tour
exports.updateTour = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tour = await getUpdateService(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Tour updated successfully",
            data: tour
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't update the tour",
            error: error.message
        })
    }
}
// Get trending tour top 3
exports.getTrendingTour = async (req, res, next) => {
    try {


        const trendingTour = await getTrendingService();

        res.status(200).json({
            status: "success",
            message: "Trending Tour found",
            data: trendingTour
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't find any trending tours",
            error: error.message
        })
    }
}
// Get cheapest tour top 3
exports.getCheapestTour = async (req, res, next) => {
    try {


        const cheapestTour = await getCheapestService();

        res.status(200).json({
            status: "success",
            message: "Cheapest Tour found",
            data: cheapestTour
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't find any cheapest tours",
            error: error.message
        })
    }
}
