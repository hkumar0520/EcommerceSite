const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// built in module
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please Enter Your Name"],
        maxLength:[30, "Name cannot exceed 30 characters"],
        minLength:[4, "Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true, "Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar:{
        public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        }
    },
    role:{
        type:String,
        default: "user"
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date,
});

// below is an event, userschema save hoga usse pehle event trigger hoga
// in arrow function , cannot use (this)
// this means individual user
userSchema.pre("save", async function(next){

    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// JWT Token
// this means individual user
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){


    // const resetToken = crypto.randomBytes(20).toString('hex');
    // console.log(resetToken);
    // const tokenCrypto = crypto.createHash('sha256').update(resetToken).digest('hex');
    // console.log(tokenCrypto);

    // Generating Token
    // hex is for correctly displaying values 
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hasing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
};


module.exports = mongoose.model("User", userSchema);


