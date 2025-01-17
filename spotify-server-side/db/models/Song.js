const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    fileUrl: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated",
    },
  }
);

class Song extends mongoose.Model {}

schema.loadClass(Song);
module.exports = mongoose.model("song", schema);
