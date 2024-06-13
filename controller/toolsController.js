import Tools from "../models/Tools.js";

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
