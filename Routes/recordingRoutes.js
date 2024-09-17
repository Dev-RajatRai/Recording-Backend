const express = require("express");
const multer = require("multer");
const {
  getRecordings,
  createRecording,
  playRecording,
} = require("../controller/recordingController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/recordings", getRecordings);

router.post("/recordings", upload.single("recordingFile"), createRecording);

router.get("/play", playRecording);

module.exports = router;
