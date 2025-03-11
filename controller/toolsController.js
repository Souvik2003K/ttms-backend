import Tools from "../models/Tools.js";
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
    const tools = await Tools.find({}).select("-photo").limit(3);
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
      .limit(perPage);
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
    const tools = await Tools.find({}).select("-photo");
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
