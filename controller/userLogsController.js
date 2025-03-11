import userLog from "../models/userLog.js";

export const logsController = async (req, res) => {
  try {
    const log = new userLog(req.body);
    log.save();
    res.status(200).send({
      success: true,
      message: "Logs saved successfully",
      log,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Cannot mark",
      error,
    });
  }
};

export const readLogsController = async (req, res) => {
  try {
    const allLogs = await userLog.find();
    res.status(200).send({
      success: true,
      message: "Logs Received",
      allLogs,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Cannot read",
      error,
    });
  }
};
