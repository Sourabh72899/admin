
const express = require('express');
const app = express();

const AdminRoutes = require('./Auth/routes/AdminRoutes')

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

app.use('/admin',AdminRoutes);


// app.use('/getDailyListing',dailylisting)


app.listen(3800,()=>{
    console.log('server is running on port 3800')
})



