const client = require("../../../database/keys")
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
})

const upload = () => multer({
    storage: multerS3({
        s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            let imagename = file["originalname"].split(".")
            cb(null, `${imagename[0]}-${Date.now()}.${imagename[1]}`)
        }
    })
})

module.exports = {
    image_create_post: async function (req, res) {
        const imageUpload = upload().single('image-upload')

        imageUpload(req, res, err => {
            if (err) return res.status(400).json({ success: false, message: err.message })
            return res.status(200).json({ success: true, location: req.file.location })
        })
    }
}