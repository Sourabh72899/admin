const mongoose = require('mongoose')

const SliderSchema = new mongoose.Schema({
    // _id: new mongoose.Types.ObjectId,
name: {type: Number}


})
const model = mongoose.model('slider',SliderSchema)

module.exports = model;