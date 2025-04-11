import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  tag_id: {
    type: String,
    required: true,
    unique: true,
  },
  macId: { type: String, required: true },

  uid: {
    type: String,
    //required: true,
    default: "",
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;
