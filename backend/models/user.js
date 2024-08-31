const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3
  },
  lastName: {
    type: String,
    required: true,
    min: 3
  },
  username: {
    type: String,
    required: true,
    min: 6,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    max: 1024,
    min: 8
  },
  avatar: {
    type: String,
    required: true
  },
  watchHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  refreshToken: {
    type: String
  }
},
  {
    timestamps: true
  }
);

// userSchema.pre('save', async (next) => {
//   if(!this.isModified("password")) return next();
//   this.password = bcrypt.hash(this.password, salt);
//   next();
// })

// userSchema.methods.isPasswordCorrect() = async function(password) {

//   return await bcrypt.compare(password, this.password)
  
// }


module.exports = mongoose.model('User', userSchema);