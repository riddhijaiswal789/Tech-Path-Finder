const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  videoUrl: {
    type: String,
    required: true
  },

  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domain",
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
