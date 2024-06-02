import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  macId: { type: String, required: true },


  uid: {
    type: String,
    //required: true,
    default: "",
  },
  battery: { type: Number, default: 76 },
  heartRate: { type: Number, default: 79 },
  heartRateVariability: { type: Number, default: 98 },
  respiratoryRate: { type: Number, default: 26 },
  spo2: { type: Number, default: 98 },
  relativeHumidity: { type: Number, default: 80 },
  orientation: { type: String },
  environment: {
    ambientTemperature: { type: Number },
    ambientPressure: { type: Number },
    dewPoints: { type: Number },
    aqi: { type: Number },
    voc: { type: Number },
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  rssi: { type: Number },
  magnetic: {
    staticMagneticField: { type: Number },
    exposureTime: { type: String },
  },
  injury: { type: String },
  textCommand: { type: String },
  altitude: { type: Number },
  fallDamage: { type: Boolean },
  bodyTemperature: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;
