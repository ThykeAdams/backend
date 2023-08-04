const userModel = require("../models/user");
const dmMessageModel = require("../models/dmMessage");
const dmModel = require("../models/dm");

const utils = {};

utils.createDmMessage = function saveMessage(events, data){
    const { dm, author, content } = data;
   // userModel.findById((data.user)).then((rUser)=>{
        //Message.create(msg).then((rMsg)=>{
           // dmModel.findByIdAndUpdate(data.dm).then((dm)=>{
                //dm.message.push(rMsg);
                //dm.save();
                events.to(dm._id.toString()).emit("DirectMessageCreate", {
                    author: {
                        id: author._id,
                        username: author.username,
                        avatar: author.avatar,
                      },
                      dm,
                      content,
                      createdAt: Date.now(),
                });
           // }).catch((err)=>{
            //    console.log(err);
            //});
        //}).catch((err)=>{
            //console.log(err);
        //});
   // }).catch((err)=>{
     //   console.log(err);
  //  });
};

module.exports = utils;
