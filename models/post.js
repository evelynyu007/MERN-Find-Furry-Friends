const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    postType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "Unknown",
    },
    imgURL: {
      type: String,
      required: true,
    },
    animalType: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      // required: true,
      default: "Unknown",
    },
    lastAddress: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reward: {
      type: String,
      default: "No reward",
    },
    contactInfo: {
      type: String,
      required: true,
    },
    //missing date?
    date: {
      type: Date,
      // require: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
