const express = require('express');
const router = express.Router();
const { Notice } = require("../models/Notice");
const { auth } = require("../middleware/auth");
const { mongoose } = require('mongoose');

router.get("/", auth, (req, res) => {
  if(req.user.role === 1) { // 관리자
    Notice.find({ "event": req.query.eventId })
      .sort({ createDate: -1 })
      .exec((err, notices) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, notices });
      })
  } else { // 사용자(참여자)
    Notice.find({ 
        "event": req.query.eventId, 
        "target": { $in: [0, req.query.target]} 
      })
      .sort({ createDate: -1 })
      .exec((err, notices) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, notices });
      })
  }
});

router.post("/create", (req, res) => {
  const notice = new Notice(req.body);

  notice.save((err, doc) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.put("/update", auth, (req, res) => {
  Notice.findOneAndUpdate(
    { "_id": req.body._id }, 
    req.body,
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  )
});

router.delete("/delete", auth, (req, res) => {
  Notice.findOneAndDelete(
    { "_id": req.query.noticeId }, {},
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  )
});

router.post("/loadUserNoticeList",(req,res)=>{
  // Notice.find({ 
  //   "event": req.body.eventId, 
  //   "target": { $in: [0, req.body.target]} 
  // })
  // .sort({ createDate: -1 })
  // .exec((err, notices) => {
  //   if(err) return res.status(400).send(err);
  //   res.status(200).json({ success: true, noticeList: notices});
  // })
  Notice.aggregate([
    { $match:{ "event" : new mongoose.Types.ObjectId(req.body.eventId) , "target" : {$in: [0, req.body.target]}}},
    { $sort: { createDate: -1 } },
    { $project:{
        _id:1,
        title:1,
        description:1,
        target:1,
        event:1,
        createDate:{ $dateToString: { format: "%Y-%m-%d", date: "$createDate" } },
        updateDate:1
      }
    }
  ],function(err, notices) {
    if(err) {
      return res.json({
        success: false,
        message:"noticeList load를 실패했습니다.",
        err
      })
    }
    else{
      return res.status(200).json({
        success: true,
        noticeList: notices
      })
    }
  })

})

module.exports = router;