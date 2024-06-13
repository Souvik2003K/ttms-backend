import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Auth failed",
          err,
        });
      } else {
        req.body.userID = decode.userID;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Auth failed",
      error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userID);
    if (user?.role === "admin") next();
    else {
      return res.status(401).send({
        success: false,
        message: "Authorised Access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting roles",
      error,
    });
  }
};
