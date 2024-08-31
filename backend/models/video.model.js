const mongoose = require('mongoose');
const mongoosebAggregatePaginate = require('mongoose-aggregate-paginate-v2')


const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
videoSchema.plugin(mongoosebAggregatePaginate)
module.exports = mongoose.Schema("Video", videoSchema);