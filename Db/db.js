const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://bishalhota264:z9WRmwxeat07DCkY@cluster0.rabcr.mongodb.net/Todo");
const {Schema} = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    email:{type:String,unique:true},
    password: String,
    firstname:String,
    Lastname:String
})

const TodoSchema = new Schema({
    Title:String,
    description:String,
    Done:Boolean,
    CreatorId:ObjectId
})

const userModel = mongoose.model("User",UserSchema);
const TodoModel = mongoose.model("Todo",TodoSchema);


module.exports = {
    userModel,
    TodoModel
}

