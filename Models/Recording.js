const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  volunteerNumber: {
    type: String,
  },
  callDate: {
    type: Date,
    required: true,
  },
  campaignId: {
    type: String,
    required: true,
  },
  agentId: {
    type: String,
    required: true,
  },
  responseCode: {
    type: String,
  },
  recordingFile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Recording", recordingSchema);
