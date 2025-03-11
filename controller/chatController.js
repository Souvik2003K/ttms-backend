import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import mongoose from "mongoose"
import { Message } from "../models/Message.js"


const createMessage = asyncHandler(async (req, res) => {
    const {content,replyOf}=req.body;
    if(!content)return res.status(400).json(new ApiResponse(400,null,"Content is Required"));

    const tweetData = {
        content,
        owner: req.body.userID,
    };
    if (replyOf) tweetData.replyOf = replyOf;
    const message = await Message.create(tweetData);    
    if(message)return res.status(200).json(new ApiResponse(200,message,"Message created Successfully"));
    else
    {
        return res.status(500).json(new ApiResponse(500,null,"Server Error"));
    }
});

const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.aggregate([
        {
            $lookup: {
                from: "messages",
                localField: "replyOf",
                foreignField: "_id",
                as: "repliedMessage"
            }
        },
        { 
            $unwind: { 
                path: "$repliedMessage",
                preserveNullAndEmptyArrays: true 
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails"
            }
        },
        { 
            $unwind: "$ownerDetails" 
        },
        {
            $project: {
                _id: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                replyOf: 1,
                repliedMessageContent: "$repliedMessage.content", 
                owner: "$ownerDetails._id",
                ownerName: "$ownerDetails.name",
                ownerRole: "$ownerDetails.role"
            }
        },
        { 
            $sort: { createdAt: -1 } 
        }
    ]);

    if (messages.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No Messages found"));
    }

    return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

export {createMessage,getMessages}