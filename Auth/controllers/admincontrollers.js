const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAuth = require('../../middleware/check-auth')
const admins = require('../models/admin')
const getSliderImage = require('../models/getSliderImage')
const slider = require('../models/Slider')


exports.adminRegister = (req, res)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err)
        {
            return res.status(500).json({
                error: err
            })
        }
        else{
            const admin = new admins({
                // _id: new mongoose.Types.ObjectId,
                adminEmail: req.body.adminEmail,
                password: hash
            })
             admin.save()
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
        }
    })

}

exports.adminLogin = (req, res)=>{
    admins.find({adminEmail: req.body.adminEmail})
    .exec()
    .then(admin=>{
        if(admin.length<1)
        {
            return res.status(401).json({
                msg: 'Admin Not Exist'
            })
        }
        bcrypt.compare(req.body.password, admin[0].password, (err, result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg: 'password Matching Fail'
                })
            }
            if(result)
            {
                const token = jwt.sign({
                    adminEmail: admin[0].adminEmail
                },
                'This is Dummy Text',
                {
                    expiresIn: "24h"
                }
                );

                res.status(200).json({
                    adminEmail: admin[0].adminEmail,
                    token: token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}

exports.getAdminProfile = (req,res,next)=>{
    
    const _id = req.params.id;
    admins.findById(_id)
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
}

exports.adminChangePassword = async(req, res)=>{
    console.log('Change Password')
try{
    const {adminId} = req.params;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
   const adminPassword = await admins.findByIdAndUpdate({_id: adminId},{password: password},{new : true});
   return res.status(200).json({
    status: true,
    data: adminPassword
   })
}catch(err){
    return res.status(400).json({
        status: false,
        error: 'Error Occured'
    })
}
}