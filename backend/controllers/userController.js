import bcrypt from "bcrypt";
import { handleImageUpload } from "../utils/handleImageUpload.util.js";
import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
	/* todo: validate body,
					 check if user already exists
					 add to User and save
	*/
};

export const loginUser = async (req, res) =>{
	/**
	 * todo: validate body
	 * todo: check if user exists
	 * todo: generate access token and refresh token
	 * todo: send success response with the user details in json
	 */
}

export const updateUser = async (req, res) => {
  const {email, password} = req.params;
	// TODO: add validation
  try {
    // Call handleImageUpload to get the image URL from Cloudinary
    const imageUrl = await handleImageUpload(req, res);
    console.log("imageURL: " + imageUrl);

    // ** slight problem, we need to validate data before parsing it **
    const updateData = {
      ...(imageUrl && { avatar: imageUrl }), // Set avatar if imageUrl exists
    };

    // check if password was also sent
    if (password) {
			// use the method created in user.model
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      updateData.password = hashPassword;
    }

    // Find the user and update with new data
    const user = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.status(200).json({ msg: "User Updated", data: user });
  } catch (err) {
    // Handle errors
    return res
      .status(500)
      .json({ msg: `Internal Error: ${err}`, data: undefined });
  }
};
