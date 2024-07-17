import userModel from "../models/userModel.js";

export const getUsersController = async (req, res) => {
  try {
    const user = await userModel.find({ role: "user" });
    //console.log(user);
    res.status(200).send({
      success: true,
      message: "All user",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting users",
      error,
    });
  }
};
