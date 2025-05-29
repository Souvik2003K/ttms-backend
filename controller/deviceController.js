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

export const allocateController = async (req, res) => {
  try {
    const tag_id = req.body.tag_id;
    //console.log(tag_id);
    const device = await Device.findOneAndUpdate(
      { _id: tag_id },
      { allocated: true },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "allocation status updated",
      device,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in updating allocation satus",
      error,
    });
  }
};

export const updateDeviceController = async (req, res) => {
  try {
    const { macId, rssi, battery } = req.body;

    if (!macId) {
      return res.status(400).json({
        success: false,
        message: "macId is required",
      });
    }

    const updatedDevice = await Device.findOneAndUpdate(
      { macId },
      {
        rssi,
        battery,
        updatedAt: new Date(),
      },
      { new: true } // returns the updated document
    );

    if (!updatedDevice) {
      return res.status(404).json({
        success: false,
        message: "Device not found with provided macId",
      });
    }

    res.status(200).json({
      success: true,
      message: "Device updated successfully",
      device: updatedDevice,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in updating device",
      error,
    });
  }
};
