import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (localFilePath) => {
  // cloudinary config
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // fixed typo here
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  try {
    // file upload with resizing
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: 'image', // Assuming you're only uploading images
        transformation: {
          width: 100,  // Resize to a width of 100px
          height: 100, // Resize to a height of 100px
          crop: 'limit', // Crop the image to fit within the 100x100 size
        },
        public_id: null,
      });

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);

    // Return the secure URL
    return uploadResult.secure_url;
  } catch (error) {
    // Delete the file in case of an error
    fs.unlinkSync(localFilePath);
    console.log('Error while uploading on Cloudinary: ', error);
    throw error;
  }
};

export { uploadOnCloudinary };
