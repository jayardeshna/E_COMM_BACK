const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
   
}, {timestamps : true})




// hashing the password

// userSchema.pre('save', async function(next){
//     console.log("hii from inside")
//     if(this.isModified('password')){
//         this.password = bcrypt.hash(this.password, 12);
//         this.password = bcrypt.hash(this.password, 12);

//     }
//     next();
// })

// hashing the password

userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {

        // const passwordHash = await bcrypt.hash(password, 10);
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }
    next();
})

// generating authtoken

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;

    } catch (error) {
        console.log(err);
    }
}


const User = mongoose.model('USER', userSchema);

module.exports = User;