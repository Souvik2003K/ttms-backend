import mongoose from "mongoose";

const tools = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  modelNumber: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  // deviceId: {
  //   type: String,
  // },
  quantity: {
    type: Number,
    required: true,
  },
  qrcode: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

const Tools = mongoose.model("Tools", tools);

export default Tools;
