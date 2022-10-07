const { createUserService, findUserByEmailService } = require("../services/user-service");
const { tokenGen } = require("../utilits/token");

// Create a new user
exports.createUser = async (req, res, next) => {

    try {
        const { email } = req.body;
        //duplicate email user check 
        const user = await findUserByEmailService(email);
        if (user) {
            return res.status(401).json({
                status: "fail",
                error: "email already exists",
            })
        }
        // create user
        const newUser = await createUserService(req.body);

        res.status(200).json({
            status: "success",
            message: "One New User was created successfully",
            data: {
                email: newUser.email,
                role: newUser.role,
                Name: newUser.firstName + " " + newUser.lastName
            }
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't create user",
            error: error.message
        })
    }
}

// login a user
exports.loginUser = async (req, res, next) => {

    try {
        // check input email and password filed exits
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                message: "please enter your credentials",
            })
        }
        // check if user email exist or not at database
        const user = await findUserByEmailService(email);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "no user found",
            })
        }
        // check password validity
        const validPassword = user.comparePassword(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                status: "fail",
                error: "password is incorrect",
            })
        }
        // return if user not activated
        if (user.status != "activated") {
            return res.status(401).json({
                status: "fail",
                error: "user is not activated",
            })
        }
        //find token
        const token = tokenGen(user);

        return res.status(200).json({
            status: "success",
            message: "successfully logged in",
            token: token
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't login",
            error: error.message
        })
    }
}
// user personal route 
exports.getMe = async (req, res, next) => {

    try {
        const user = await findUserByEmailService(req.user.email);

        res.status(200).json({
            status: "success",
            message: "you are logged in successfully",
            data: user
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "can't get user",
            error: error.message
        })
    }
}