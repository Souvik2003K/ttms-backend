import Device from "../models/Device.js";

export const createDeviceController = async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();

    res.status(201).send({
      success: true,
      message: "device added Successfully",
      device,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in adding device",
      error,
    });
  }
};
