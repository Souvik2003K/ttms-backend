import { changeStatus } from "../helper/data.js";
import Device from "../models/Device.js";
import Tools from "../models/Tools.js";

export const updateToolsData = async () => {
  try {
    const tools = await Tools.find();

    for (const tool of tools) {
      const status = changeStatus();

      const updateResult = await Tools.updateOne(
        { serialNumber: tool.serialNumber },
        {
          $set: {
            status: status,
          },
        },
        { new: true }
      );

      if (updateResult.nModified === 0) {
        console.log("No documents modified for tool:", tool.serialNumber);
      } else {
        console.log("Tool status updated successfully.");
      }
    }
  } catch (error) {
    console.error("Error updating tools data", error);
  }
};

// const latMin = 26.2924417;
// const latMax = 26.293055;
// const lonMin = 78.2321;
// const lonMax = 78.232945;

const latMin = 26.292257;
const latMax = 26.293055;
const lonMin = 78.2321;
const lonMax = 78.232945;

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomCoordinate() {
  return {
    latitude: getRandomInRange(latMin, latMax),
    longitude: getRandomInRange(lonMin, lonMax),
  };
}

export const updateDeviceCoordinates = async () => {
  try {
    const devices = await Device.find();

    for (const device of devices) {
      const newLocation = generateRandomCoordinate();
      device.location = newLocation;
      device.updatedAt = new Date();
      await device.save(); // or Device.updateOne({ _id: device._id }, { location: newLocation });
      console.log(`Updated ${device.tag_id} to:`, newLocation);
    }
  } catch (err) {
    console.error("Error updating devices:", err);
  }
};
