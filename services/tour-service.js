const { ObjectId } = require("mongodb");
const Tour = require("../models/tour-model");

//create a tour
exports.createTourService = async (data) => {

    // create a new tour and save it to database 
    const newCreatedTour = await Tour.create(data);

    return newCreatedTour;
}
//get all tours
exports.getAllTourService = async (queries, data, skip, limit) => {

    // create a new tour and save it to database 
    const tours = await Tour.find({}).select(queries).sort(data).skip(skip).limit(limit);

    return tours;
}
//get a tour
exports.getSingleService = async (id) => {

    // find a single tour 
    const tour = await Tour.findOneAndUpdate({ _id: ObjectId(id) }, {
        $inc: {
            counter: 1
        }
    });

    return tour;
}
//update a tour
exports.getUpdateService = async (id, data) => {

    // find a single tour 
    const tour = await Tour.updateOne({ _id: ObjectId(id) }, { $set: data });

    return tour;
}
//get a trending tour
exports.getTrendingService = async () => {

    const trendingTour = await Tour.find({}).sort({ counter: -1 }).limit(3);

    return trendingTour;
}
//get a cheapest tour
exports.getCheapestService = async () => {

    const cheapestTour = await Tour.find({}).sort({ price: 1 }).limit(3);

    return cheapestTour;
}