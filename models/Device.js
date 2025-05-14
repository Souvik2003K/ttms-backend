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
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
  status: {
    type: String,
    enum: ["Connected", "Disconnected"],
    default: "Disconnected",
  },
  rssi: {
    type: String,
    default: "",
  },
  battery: {
    type: Number,
    default: null,
  },
  allocated: {
    type: Boolean,
    default: false,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;
