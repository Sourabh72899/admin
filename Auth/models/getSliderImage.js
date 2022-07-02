const mongoose = require("mongoose");

const SliderImageSchema =new mongoose.Schema({

    sliderId: {type: Number},
    uploadImage: {type: String},
    link: {type: String}


})


module.exports = mongoose.model("SliderImage",SliderImageSchema);