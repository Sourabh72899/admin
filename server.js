
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const PORT = process.env.PORT
const AdminRoutes = require('./Auth/routes/AdminRoutes')

const mongoose = require('mongoose')
app.use(express.json());
mongoose.connect('mongodb+srv://sourabh:7289933709sourabh@inhousedemo.yrgfd.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.log("DB Error: ", err);
        process.exit(1);
    } else {
        console.log('MongoDB Connected');
    }
});

app.use('/admin',AdminRoutes);


// app.use('/getDailyListing',dailylisting)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})



