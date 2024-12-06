import mongoose from 'mongoose';
import new_message from '../models/message.model';


//code for sending a new message 

export const sendmessage = async(req, res) => {
    const { senderId, recieverId, message } = req.body;

    if(!senderId || !recieverId || !message){
        return res.status(400).json({ pass: false, text: 'provide all the fields'});
    }

    try{
        const mess = new Message({
            sender: senderId,
            receiver: recieverId,
            message,
        });

        await mess.save();
        res.status(201).json({success: true, new_data: mess});
    } catch(error) {
        console.error('Error in sending data', errormes);
        res.status(500).json({success: false, message: 'server failure'});

    }

};

export const receivemessage = async (req, res) => {
    const{usera, userb} = req.query;

    if(!usera || !userb){
        return res.status(400).json({success: false, message: 'provide all IDs'});
    }

    try{
        const messages = await new_message.find({
            $or: [
                { sender: usera, recipient: userb},
                { sender: userb,  recipient: usera},
            ]
        }).sort({createdAt: 2});

        res.status(200).json({ success: true, data: messages});
    } catch(error){
        console.error('Error in getting messages:', error.message);
        res.status(500).json({success: false, message: 'server mistake'});
    }
};

export const markread = async(req, res) => {
    const { usera, userb } = req.body;
}

if(!usera || !userb){
    return res.status(400).json({success: false, message: 'include all user ID'});
}

try{
    const res = await Message.updateMany(
        { sender: userb, receiver: usera, read: false},
        { $set: {read: true}}
    );
    res.status(200).json({success: true, data: result});
} catch(error){
    console.error('Error in reading', error.message);
    res.status(500).json({success: false, message: 'server'});
}
