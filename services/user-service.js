const User = require("../models/user-model");

exports.createUserService = async (data) => {
    // console.log(data);
    // create a new tour and save it to database 
    const newCreatedUser = await User.create(data);

    return newCreatedUser;
}
exports.findUserByEmailService = async (email) => {
    // console.log(data);
    const userEmail = await User.findOne({ email });

    return userEmail;
}

