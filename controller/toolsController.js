import Tools from "../models/Tools.js";
import fs from "fs";

export const addToolsController = async (req, res) => {
  try {
    // const {
    //   name,
    //   modelNumber,
    //   serialNumber,
    //   quantity,
    //   qrcode,
    //   manufacturer,
    //   location,
    //   status,
    //   purchaseDate,
    // } = req.fields;
    // console.log(req.fields);
    // const { photo } = req.files;

    // const tool = new Tools({ ...req.fields });
    // if (photo) {
    //   tool.photo.data = fs.readFileSync(photo.path);
    //   tool.photo.contentType = photo.type;
    // }
    // await tool.save();
    // res.status(201).send({
    //   success: true,
    //   message: "New tool successfully added",
    //   //tool,
    // });
    const fields = req.body;
    const { file } = req;

    console.log(fields); // Log the fields to verify data

    const tool = new Tools({ ...fields });

    if (file) {
      tool.photo.data = fs.readFileSync(file.path);
      tool.photo.contentType = file.mimetype;
    }

    await tool.save();
    res.status(201).send({
      success: true,
      message: "New tool successfully added",
      tool,
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
