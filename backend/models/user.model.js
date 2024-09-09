import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8
  },
  avatar: {
    type: String,
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

userSchema.pre('save', async function (next) {
  if(this.avatar) return next();
  this.avatar = `https://api.dicebear.com/9.x/lorelei/svg?seed=${this.email}`;
  next();
})

userSchema.pre('save', async function (next){
  if(!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, salt);
  next();
})


userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAcessToken = function(){
  return jwt.sign(
    {
    _id: this._id //CAN ADD MORE FIELDS LIKE NAME AND EMAIL
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
    _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const User = mongoose.model("User", userSchema);
