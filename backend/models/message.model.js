import mongoose from "mongoose";

const schema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reciepient: { //the person who gets the message
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    message_read: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true,
});

const new_message = mongoose.model('type', schema);

export default new_message;