import { Message } from "../models/message.js";

export const save_message = async (req, res) => {
  const {message} = req.body
  try {
    if (!message) {
      res.status(400).json({error: 'please enter a message'})
    }
    else{
      let transposeText;
      if (message.split(" ").length > 1) {
        transposeText = message.split(" ").reverse().join(" ")
    }
    else{
      transposeText = message.split("").reverse().join("")
    }
    let sentMsg = await Message.findOne({message})
    if (sentMsg) {
      res.status(400).json('this message already exist')
    }
    else{
      let createMsg = await Message.create({
        message,
        transposeText
      })
  
      createMsg.save()
  
      res.status(201).json(createMsg)    
    }
    }

  } catch (error) {
    console.log(error)
  }
};

// get all messages
export const get_message = async (req, res) => {
  let messages = await Message.find().sort({createdAt: -1})
  if (!messages) {
    res.status(404).json({error: 'message does not exist'})
  } else {
    res.status(200).json(messages)
  }
};

