import mongoose from "mongoose";

const allocationHistorySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      ref: "User", // Reference to User model
    },
    toolsAllocated: [
      {
        type: String,
        required: true,
        ref: "Tools", // Reference to Tools model
      },
    ],
    allocatedFrom: {
      type: Date,
      required: true,
    },
    allocatedUpto: {
      type: Date,
      required: true,
    },
    extendedUntil: {
      type: Date, // This can be updated later if extended
    },
  },
  { timestamps: true }
);

const AllocationHistory = mongoose.model(
  "AllocationHistory",
  allocationHistorySchema
);

export default AllocationHistory;
