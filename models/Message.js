import mongoose,{Schema}  from "mongoose";

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    replyOf: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    }
}, {timestamps: true})


export const Message = mongoose.model("Message", messageSchema)