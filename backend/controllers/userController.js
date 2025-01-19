export const updateUser = async (req, res) => {
	const email = req.params.email;

	
	try {
		console.log();
		// Call handleImageUpload to get the image URL from Cloudinary
		const imageUrl = await handleImageUpload(req, res);

		// ** slight problem, we need to validate data before parsing it **
		const updateData = {
			...req.body, // spread operator to include other fields from the request body
			...(imageUrl && { avatar: imageUrl }) // Set avatar if imageUrl exists
		};

		// Find the user and update with new data
		const user = await UserModel.findOneAndUpdate({ email }, updateData, {
			new: true,
		});

		if (!user) {
			return res.status(404).json({ msg: 'User not found.' });
		}
		return res.status(200).json({ msg: "User Updated", data: user });
	} catch (err) {
		// Handle errors
		return res.status(500).json({ msg: `Internal Error: ${err}`, data: undefined });
	}
};
