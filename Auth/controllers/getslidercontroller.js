const GetSliderImages = require('../models/getSliderImage')
const AWS = require('aws-sdk');
const multer = require('multer');
const storage = multer.memoryStorage()
const Slider = require('../models/Slider')
var upload = multer({ storage: storage });
const s3Client = new AWS.S3({
    secretAccessKey: process.env.secretAccessKey,

    accessKeyId: process.env.accessKeyId,
    region: process.env.region
})
const uploadParams = {
    Bucket: process.env.Bucket,
    Key: '',
    Body: null,
};

exports.addSliderId = (req, res) => {
    const addSliderId = new GetSliderImages({
        sliderId: req.body.sliderId,
        link: req.body.link
    })
    // Upload_Image: data.Location   


    addSliderId.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                updatedData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

}
exports.adddSliderImage = (req, res) => {
    const params = uploadParams;
    const id = req.params.sliderId;
    console.log(id)
    console.log("time", new Date());
    uploadParams.Key = req.file.originalname;
    uploadParams.Body = req.file.buffer;

    s3Client.upload(params, async (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error -> " + err });
        }
        else {

            res.json({
                message: 'File uploaded successfully', 'filename':
                    req.file.originalname, 'location': data.Location
            });
            const uploads = data.Location

            const dataBoq = await GetSliderImages.findById(id);
            dataBoq.uploadImage = uploads;
            await dataBoq.save();

        }
    });


}


exports.getBySliderId = (req, res) => {
    console.log(req.query)
    const sliderId = req.query.sliderId;
    GetSliderImages.find({ sliderId: req.query.sliderId })
        .then(result => {
            res.status(200).json({
                Data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.addSliderName = (req, res) => {
    const slider = new Slider({
        // _id: new mongoose.Types.ObjectId,
        name: req.body.name
    })
    slider.save()
        .then(result => {
            res.status(200).json({
                Data: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.updateSliderName = (req, res) => {
    Slider.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name
        }
    })
        .then(result => {
            res.status(200).json({
                Updated_Slider: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}
exports.deleteSlider = (req, res) => {
    Slider.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "Slider Deleted",
                Deleted_Slider: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

}


exports.getSliderName = (req, res)=>{
    Slider.find()
    .then(result=>{
        res.status(200).json({
            getData: result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status
    })

}