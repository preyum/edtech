import { uploadOnCloudinary } from "./cloudinary.service.js";
export const handleImageUpload = async (req, res) => {
  let imageUrl = "";
  // check if avatar field exists in the uploaded files
  if (req.files?.avatar?.length) {
    // get local file path
    const localFilePath = req.files.avatar[0].path;
    console.log("File path: " + localFilePath);
    try {
      // Upload file to cloudinary and get URL
      imageUrl = await uploadOnCloudinary(localFilePath);
      console.log("File uploaded succesfully");
    } catch (error) {
      res.status.json({
        msg: `File Upload Failed: ${error}`,
      });
    }
  } else {
    console.log("File not found");
  }
  return imageUrl;
};
