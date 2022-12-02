import * as Cloudinary from 'cloudinary'
import fs from 'fs'

const uploadImage = async (req) => {
  const imageProps = await Cloudinary.v2.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'fileupload',
    }
  )

  fs.unlinkSync(req.files.image.tempFilePath)
  return imageProps
}

export default uploadImage
