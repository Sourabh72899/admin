
const express = require('express');
const app = express();
const AdminRoute = require('./Routes/admin')
const AdminSliderRoute = require('./Routes/Slider')

const getSliderRoute = require('./Routes/getSliderImage')

const mongoose = require('mongoose')
app.use(express.json());
mongoose.connect('mongodb://localhost/himotech', {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.log("DB Error: ", err);
        process.exit(1);
    } else {
        console.log('MongoDB Connected');
    }
});

app.use('/admin',AdminRoute);
app.use('/admin/slider',AdminSliderRoute)
app.use('/getSliderImage',getSliderRoute)

// app.use('/getDailyListing',dailylisting)


app.listen(3800,()=>{
    console.log('server is running on port 3800')
})



