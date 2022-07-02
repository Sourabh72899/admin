const express = require('express');
const router = express.Router();
const GetSliderImage = require('../Model/getSliderImage')
const AWS = require('aws-sdk');
const multer = require('multer');
const storage = multer.memoryStorage()

const upload = multer({storage: storage});
router.post('/',(req,res)=>{
    const addSliderId = new GetSliderImage({
        sliderId: req.body.sliderId,
        link: req.body.link
    })
        // Upload_Image: data.Location   
    
   
    addSliderId.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            updatedData:result
        })
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
      })
  })
  // const s3Client = new AWS.S3({
  //   secretAccessKey: "y+WkLEX2OTbX7EQvnEpRBGYTHJsbEqM/87paVkvb",

  //   accessKeyId: "AKIAVCSVHO4TMXC4OCD2",
  //   region: 'ap-south-1' 
  // });
  
  // const uploadParams = {
  //        Bucket: 'idesignchat', 
  //        Key: '', 
  //        Body: null, 
  // };
  // router.put('/uploadDrawing/:sliderId', upload.single("uploadImage"),async(req,res) => {
  //   const params = uploadParams;
  //   const id = req.params.sliderId;
  //   console.log(id)
  //   uploadParams.Key = req.file.originalname;
  //   uploadParams.Body = req.file.buffer;
  
  //   s3Client.upload(params,async (err, data) => {
  //       if (err) {
  //           res.status(500).json({error:"Error -> " + err});
  //       }
  //       res.json({message: 'File uploaded successfully','filename': 
  //       req.file.originalname, 'location': data.Location});
  // const uploads = data.Location
    
  //   const dataBoq = await GetSliderImage.findById(id);
  //   dataBoq.uploadImage=uploads;
  //   await dataBoq.save();
  //   });
  // });

  router.get('/',async (req,res)=>{
    console.log(req.query)
    
    const {sliderId} = req.query.sliderId

     GetSliderImage.findOne (sliderId)
     .exec()
     .then(result=>{
         res.status(200).json({
             Data: result
           
             
         })
     })
     .catch(err=>{
         console.log(err)
         res.status(500).json({
             error: err
         })
     })
    

    




    res.json({status: 'error', data: "Inavlid adminEmail/Password "})
})

router.get('/', async(req, res)=>{

try {
  console.log(req.query)
  const {sliderId} = req.query.sliderId
  const vehicle = await GetSliderImage.find({ sliderId:req.query.sliderId  });
  res.status(200).json(vehicle);
} catch (error) {
  res.status(500).json({ message: error });
}
});



  module.exports = router