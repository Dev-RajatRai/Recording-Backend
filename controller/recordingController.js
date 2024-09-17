const Recording = require("../Models/Recording");
const path = require("path");

const getRecordings = async (req, res) => {
  try {
    const {
      campaignId,
      phoneNumber,
      volunteerNumber,
      callDateFrom,
      callDateTo,
      agentId,
      responseCode,
    } = req.query;

    const query = {};

    if (campaignId && campaignId !== "") {
      query.campaignId = { $in: campaignId.split(",") };
    }
    if (phoneNumber && phoneNumber !== "") {
      query.phoneNumber = phoneNumber;
    }
    if (volunteerNumber && volunteerNumber !== "") {
      query.volunteerNumber = volunteerNumber;
    }
    if (callDateFrom && callDateFrom !== "null") {
      query.callDate = { ...query.callDate, $gte: new Date(callDateFrom) };
    }
    if (callDateTo && callDateTo !== "null") {
      query.callDate = { ...query.callDate, $lte: new Date(callDateTo) };
    }
    if (agentId && agentId !== "") {
      query.agentId = agentId;
    }
    if (responseCode && responseCode !== "") {
      query.responseCode = responseCode;
    }

    const recordings = await Recording.find(query);
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRecording = async (req, res) => {
  const { phoneNumber, callDate, responseCode, campaignName, agentId } =
    req.body;

  const recordingFile = req.file ? req.file.filename : "dummy-audio.mp3";

  const newRecording = new Recording({
    phoneNumber,
    callDate,
    recordingFile,
    responseCode,
    campaignName,
    agentId,
  });

  try {
    const savedRecording = await newRecording.save();
    res.status(201).json(savedRecording);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const playRecording = (req, res) => {
  const filePath = path.join(__dirname, "../uploads/dummy-audio.mp3");
  res.sendFile(filePath);
};

module.exports = { getRecordings, createRecording, playRecording };
