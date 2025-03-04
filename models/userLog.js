import mongoose from "mongoose";

const userLogSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userLog = mongoose.model("userLog", userLogSchema);

export default userLog;
