import Tools from "../models/Tools.js";
import userModel from "../models/userModel.js";
import AllocationHistory from "../models/AllocationHistory.js";
import moment from "moment"; // A library to handle dates

export const addToolsController = async (req, res) => {
  try {
    const fields = req.body;
    const { file } = req;

    console.log(fields); // Log the fields to verify data

    const tool = new Tools({ ...fields });

    if (file) {
      tool.photo.data = file.buffer;
      tool.photo.contentType = file.mimetype;
    }

    await tool.save();
    res.status(201).send({
      success: true,
      message: "New tool successfully added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding tools",
      error,
    });
  }
};

export const getToolsController = async (req, res) => {
  try {
    const tools = await Tools.find({})
      .select("-photo")
      .limit(3)
      .populate("tag_id");
    res.status(200).send({
      success: true,
      count: tools.length,
      message: "All tools",
      tools,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all tools",
      error,
    });
  }
};

export const getToolsPhotoController = async (req, res) => {
  try {
    const tool = await Tools.findById(req.params.tid).select("photo");
    if (tool.photo.data) {
      res.set("Content-type", tool.photo.contentType);
      return res.status(200).send(tool.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting tool photo",
      error,
    });
  }
};

export const toolListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const tool = await Tools.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("tag_id");
    //.sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Tools List fetched successfully",
      tool,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting list of tool",
      error,
    });
  }
};

export const toolCountController = async (req, res) => {
  try {
    const tools = await Tools.find({}).select("-photo");
    res.status(200).send({
      success: true,
      count: tools.length,
      message: "All tools",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting count of tool",
      error,
    });
  }
};

export const getToolsNameController = async (req, res) => {
  try {
    const tools = await Tools.find({}).select("-photo").populate("tag_id");
    res.status(200).send({
      success: true,
      count: tools.length,
      message: "All tools",
      tools,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all tools",
      error,
    });
  }
};

export const getToolsSerialController = async (req, res) => {
  try {
    const tools = await Tools.find({ name: req.params.name }).select("-photo");
    //console.log(serialNo);
    res.status(200).send({
      success: true,
      message: "get serial number",
      tools,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting serail number",
      error,
    });
  }
};

export const getToolsBySerialNoController = async (req, res) => {
  try {
    const tool = await Tools.find({ serialNumber: req.params.serial }).select(
      "-photo"
    );
    res.status(200).send({
      success: true,
      message: "get tool",
      tool,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting tools",
      error,
    });
  }
};

export const updateStatusController = async (req, res) => {
  try {
    const tool = await Tools.findOneAndUpdate(
      { serialNumber: req.params.serial },
      { status: req.body.status, allocatedTo: req.body.allocatedTo },
      { new: true }
    ).select("-photo");
    res.status(200).send({
      success: true,
      message: "Status of tool updated",
      tool,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating status of tool",
      error,
    });
  }
};

export const updateCalliberationController = async (req, res) => {
  try {
    const today = moment().format("DD-MM-YYYY");
    const nextCalliberationDate = moment().add(10, "days").format("DD-MM-YYYY");

    const tool = await Tools.findOneAndUpdate(
      { serialNumber: req.params.serial },
      {
        calliberationDate: today,
        nextCalliberationDate: nextCalliberationDate,
      },
      { new: true }
    ).select("-photo");
    res.status(200).send({
      success: true,
      message: "calliberation date updated",
      tool,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating calliberation date",
      error,
    });
  }
};

export const bulkAuditController = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send({
      success: true,
      message: "Bulk Audit Successfully done",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in bulk audit",
      error,
    });
  }
};

// export const toolAllocateController = async (req, res) => {
//   try {
//     const tool = await Tools.findOneAndUpdate(
//       { serialNumber: req.body.serialNumber },
//       {
//         status: "Allocated",
//         allocatedTo: req.body.allocatedTo,
//         allocatedFrom: req.body.allocatedFrom
//           ? new Date(req.body.allocatedFrom)
//           : null,
//         allocatedUpto: req.body.allocatedUpto
//           ? new Date(req.body.allocatedUpto)
//           : null,
//       },
//       { new: true }
//     ).select("-photo");

//     // Save allocation history
//     await AllocationHistory.create({
//       username: req.body.allocatedTo,
//       toolsAllocated: [tool.name], // Store tool name
//       allocatedFrom: req.body.allocatedFrom,
//       allocatedUpto: req.body.allocatedUpto,
//     });

//     const user = await userModel
//       .findOneAndUpdate(
//         { username: req.body.allocatedTo },
//         { $addToSet: { allocatedTools: tool._id } },
//         { new: true }
//       )
//       .populate("allocatedTools");
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "Tools Allocated Successfully",
//       tool,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Can`t Allocate",
//       error,
//     });
//   }
// };

export const toolAllocateController = async (req, res) => {
  try {
    const { serialNumbers, allocatedTo, allocatedFrom, allocatedUpto } =
      req.body;

    if (!Array.isArray(serialNumbers) || serialNumbers.length === 0) {
      return res.status(400).send({
        success: false,
        message: "No serial numbers provided",
      });
    }

    const updatedTools = [];

    for (const serialNumber of serialNumbers) {
      const tool = await Tools.findOneAndUpdate(
        { serialNumber },
        {
          status: "Allocated",
          allocatedTo,
          allocatedFrom: allocatedFrom ? new Date(allocatedFrom) : null,
          allocatedUpto: allocatedUpto ? new Date(allocatedUpto) : null,
        },
        { new: true }
      ).select("-photo");

      if (tool) updatedTools.push(tool);
    }

    // Save allocation history
    await AllocationHistory.create({
      username: allocatedTo,
      toolsAllocated: updatedTools.map((t) => t.name), // Store all tool names
      allocatedFrom,
      allocatedUpto,
    });

    // Update user with all allocated tool IDs
    const user = await userModel
      .findOneAndUpdate(
        { username: allocatedTo },
        {
          $addToSet: {
            allocatedTools: { $each: updatedTools.map((t) => t._id) },
          },
        },
        { new: true }
      )
      .populate("allocatedTools");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Tools Allocated Successfully",
      tools: updatedTools,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't Allocate",
      error,
    });
  }
};

export const toolHandoverController = async (req, res) => {
  try {
    const { username, remarks } = req.body;

    // Find the user
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Deallocate all tools associated with this user
    const updatedTools = await Tools.updateMany(
      { _id: { $in: user.allocatedTools } },
      {
        $set: {
          status: "Available",
          allocatedTo: null,
          allocatedFrom: null,
          allocatedUpto: null,
        },
      }
    );

    // Clear allocatedTools array from user profile
    user.allocatedTools = [];
    user.remarks = remarks || ""; // fallback if empty
    await user.save();

    res.status(200).send({
      success: true,
      message: "All tools successfully deallocated from user",
      updatedToolsCount: updatedTools.modifiedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can`t Handover",
      error,
    });
  }
};

export const toolsAllocationHistoryController = async (req, res) => {
  try {
    const history = await AllocationHistory.find().sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching history",
      error,
    });
  }
};
