const express = require("express");
const router = express.Router();
const Song = require("../db/models/Song.js");
const Response = require("../lib/Response.js");
const CustomError = require("../lib/Error.js");
const Enum = require("../config/Enum.js");
const AuditLogs = require("../lib/AuditLogs");


router.post("/add", async (req, res) => {
  const { title, category, fileUrl } = req.body;

  try {
    if (!title || !fileUrl) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error!",
        "The 'title' and 'fileUrl' fields must be filled."
      );
    }

    const song = new Song({
      title,
      category,
      fileUrl,
    });

    await song.save();

    AuditLogs.info(req.user?.email, "Songs", "Add", song.title);
    res.json(Response.successResponse({ success: true, data: song }));

  } catch (err) {
    
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(Response.successResponse({ success: true, data: songs }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
}
});


router.post("/delete", async (req, res) => {
  try {
    const body = req.body;
    let song = body._id;

    if (!song) {
      throw new CustomError(
        Enum.HTTP_CODES.NOT_FOUND,
        "Not Found",
        "Song not found."
      );
    }

    await Song.deleteOne({ _id: song });

    AuditLogs.info(req.user?.email, "Songs", "Delete", song.title);

    res.json(Response.successResponse({ success: true, data: song }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;
