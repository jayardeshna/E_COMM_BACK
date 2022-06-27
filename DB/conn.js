const mongoose = require('mongoose');

const URI='mongodb+srv://shop:shop@cluster0.p3uqtce.mongodb.net/?retryWrites=true&w=majority'

const connectDb=async()=>{
await mongoose.connect(URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
});
console.log("database connection successfull")
}

module.exports = connectDb;