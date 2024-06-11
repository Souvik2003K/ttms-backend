import { changeStatus } from "../helper/data.js";
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
