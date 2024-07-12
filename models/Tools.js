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
    const [day, month, year] = this.purchaseDate.split("-");
    const purchaseDate = new Date(`${year}-${month}-${day}`);
    const nextCaliberationDate = new Date(
      purchaseDate.setFullYear(purchaseDate.getFullYear() + 1)
    );

    // Format nextCaliberationDate as dd-mm-yyyy
    const nextDay = String(nextCaliberationDate.getDate()).padStart(2, "0");
    const nextMonth = String(nextCaliberationDate.getMonth() + 1).padStart(
      2,
      "0"
    );
    const nextYear = nextCaliberationDate.getFullYear();

    this.nextCalliberationDate = `${nextDay}-${nextMonth}-${nextYear}`;
  }
  next();
});

const Tools = mongoose.model("Tools", tools);

export default Tools;
