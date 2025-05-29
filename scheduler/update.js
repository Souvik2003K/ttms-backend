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

function getRandomPointInTriangle(p1, p2, p3) {
  let r1 = Math.random();
  let r2 = Math.random();

  if (r1 + r2 >= 1) {
    r1 = 1 - r1;
    r2 = 1 - r2;
  }

  const lat = p1.lat + r1 * (p2.lat - p1.lat) + r2 * (p3.lat - p1.lat);
  const lng = p1.lng + r1 * (p2.lng - p1.lng) + r2 * (p3.lng - p1.lng);

  return { latitude: lat, longitude: lng };
}

function generateRandomCoordinateInGeoRectangle() {
  const A = { lat: 26.292257, lng: 78.233106 };
  const B = { lat: 26.292382, lng: 78.232639 };
  const C = { lat: 26.29293, lng: 78.232832 };
  const D = { lat: 26.292844, lng: 78.233287 };

  // Pick triangle ABC or ACD
  if (Math.random() < 0.5) {
    return getRandomPointInTriangle(A, B, C);
  } else {
    return getRandomPointInTriangle(A, C, D);
  }
}

export const updateDeviceCoordinates = async () => {
  try {
    const devices = await Device.find();

    for (const device of devices) {
      //const newLocation = generateRandomCoordinate();
      const newLocation = generateRandomCoordinateInGeoRectangle();
      device.location = newLocation;
      device.updatedAt = new Date();
      await device.save(); // or Device.updateOne({ _id: device._id }, { location: newLocation });
      console.log(`Updated ${device.tag_id} to:`, newLocation);
    }
  } catch (err) {
    console.error("Error updating devices:", err);
  }
};
