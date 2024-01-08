import mongoose from "mongoose";
const { Schema, model, Types:{ObjectId} } = mongoose;

const ReviewSchema = new Schema({
  gigId:{type:String, required:true},
  userId:{type:String, required:true},
  star:{type:Number, required:true, enum:[1,2,3,4,5]},
  desc:{type:String, required:true}

});

const Review = model("Review", ReviewSchema);
module.exports= Review;