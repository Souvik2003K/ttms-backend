import mongoose from "mongoose";

const tools = new mongoose.Schema(
  {
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
      //required: true,
      default: "New Device",
    },
    purchaseDate: {
      type: String,
      required: true,
    },
    calliberationDate: {
      type: String,
    },
    nextCalliberationDate: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

tools.pre("save", function (next) {
  if (!this.calliberationDate) {
    this.calliberationDate = this.purchaseDate;
  }
  if (!this.nextCalliberationDate) {
    const purchaseDate = new Date(this.purchaseDate);
    const nextCaliberationDate = new Date(
      purchaseDate.setFullYear(purchaseDate.getFullYear() + 1)
    );
    this.nextCalliberationDate = nextCaliberationDate
      .toISOString()
      .split("T")[0]; // format as YYYY-MM-DD
  }
  next();
});

const Tools = mongoose.model("Tools", tools);

export default Tools;
