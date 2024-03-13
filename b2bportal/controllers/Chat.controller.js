const ChatModel = require('../models/Chat.model');

const getAllChat = async (req, res) => {
  try {
    const { userId } = req.body;

    const chats = await ChatModel.find({
      chatId: { $regex: userId, $options: 'i' },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchOneChat = async (req,res)=>{
  const {senderId, recieverId} = req.body

  try {
    const chat = await ChatModel.findOne({ chatId:`${senderId}${recieverId}` || `${recieverId}${senderId}` })
    if(chat){
      return res.status(200).json({
        status:'success',
        chat:chat
      })
    }
    return res.status(404).json({
      status: 'not found',
      message: 'No chat found for the given senderId and receiverId.',
    });
  } catch (error) {
    return res.status(500).json({
      status:'error',
      error:error
    })
  }
}

module.exports = { getAllChat, fetchOneChat };
