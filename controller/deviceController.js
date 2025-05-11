import Device from "../models/Device.js";
import { nanoid } from "nanoid";

export const createDeviceController = async (req, res) => {
  try {
    const { macId } = req.body;

    if (!macId) {
      return res.status(400).send({
        success: false,
        message: "macId is required",
      });
    }

    // Generate a unique tag_id using nanoid
    const tag_id = `TAG_${nanoid(6)}`; // e.g., TAG_A1B2C3

    const device = new Device({
      tag_id,
      macId,
    });

    await device.save();

    res.status(201).send({
      success: true,
      message: "Device added successfully",
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

export const getDeviceController = async (req, res) => {
  try {
    const device = await Device.find({});
    res.status(201).send({
      success: true,
      message: "Device get successfully",
      device,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in getting device",
      error,
    });
  }
};
