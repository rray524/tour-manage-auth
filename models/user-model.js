const { mongoose } = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"],

    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {

                validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                });
                message: "Password {VALUE} is invalid"
            }
        }
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm Password'],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Password don't match"
        }
    },
    role: {
        type: String,
        enum: ["visitor", "content-manager", "admin"],
        default: "visitor"
    },
    firstName: {
        type: String,
        required: [true, "Please enter first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [100, "Name can be at best 100 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter last name"],
        trim: true,
        minLength: [3, "Last Name must be at least 3 characters long"],
        maxLength: [100, "Last Name can be at best 100 characters long"],

    },
    contact: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide correct phone number"],
    },
    status: {
        type: String,
        enum: ["activated", "deactivated"],
        default: "activated",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    timestamps: true
})

userSchema.pre("save", function (next) {

    const saltRounds = 17;
    // const salt = bcrypt.genSaltSync(saltRounds);

    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
})

userSchema.methods.comparePassword = function (password, hash) {
    const isValidPassword = bcrypt.compareSync(password, hash);
    return isValidPassword;
}
// SCHEMA --> MODEL -->

const User = mongoose.model('User', userSchema)

module.exports = User;