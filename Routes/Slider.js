const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Slider = require('../Model/Slider')



//Add Slider


router.post('/add',(req,res)=>{
    const slider = new Slider({
        // _id: new mongoose.Types.ObjectId,
        name: req.body.name
    })
    slider.save()
    .then(result=>{
        res.status(200).json({
            Data: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})


//update Slider


router.put('/update/:id',(req,res)=>{
    Slider.findOneAndUpdate({_id: req.params.id},{
        $set:{
            name: req.body.name
        }
    })
    .then(result=>{
        res.status(200).json({
            Updated_Slider: result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

//delete Slider


router.delete('/remove/:id',(req,res)=>{
    Slider.remove({_id: req.params.id})
    .then(result=>{
        res.status(200).json({
            message: "Slider Deleted",
            Deleted_Slider: result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})
module.exports = router;