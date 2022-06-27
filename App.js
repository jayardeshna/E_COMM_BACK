const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require('./DB/conn')


dotenv.config();



connectDb();

app.use(cors());
app.use(express.json());

app.use(require('./Route/auth'));
app.use(require('./Route/user'));
app.use(require('./Route/cart'));
app.use(require('./Route/order'));
app.use(require('./Route/product'));
app.use(require('./Route/stripe'))


app.listen(process.env.PORT,()=>{
    console.log(`App is running on ${process.env.PORT}`);
})