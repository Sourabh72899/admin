const mongoose = require('mongoose')


const AdminSchema = new mongoose.Schema({
    // _id: new mongoose.Types.ObjectId,
    adminEmail: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},
{
    collection: 'admin'
})

const model = mongoose.model('AdminSchema',AdminSchema)

module.exports = model;