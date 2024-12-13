const {Router} = require("express");
const {UserModel,TodoModel} = require("../Db/db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sanvi8724"

userRouter.post("/signup",async function(req,res){
    const{firstname,Lastname,email,password} = req.body;

    await UserModel.create({
        firstname:firstname,
        Lastname:Lastname,
        email:email,
        password:password
    })
})


userRouter.post("signin",async function(req,res){
    const{email,password} = req.body;

    const user = await UserModel.finOne({
        email:email,
        password:password
    });

    if(user){
        const token = jwt.sign({
            id:user._id
        },JWT_SECRET);

        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            msg:"Invalid credentials"
        })
    }
})

function auth(req,res,next){
    const token = req.heder.token;

    const decoded = jwt.verify(token,JWT_SECRET);

    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message:"You are not signed in,Wrong inputs"
        });
    }
}


userRouter.post("/Todo",auth,async function(req,res){
    const userId = req.userId;

    const NewTodo = await TodoModel.create({
        Title:String,
        description:String,
        Done:Boolean,
        CreatorId:userId
    });
})


userRouter.get("/getTodo",auth,async function(req,res){
    const userId = req.userId;
    const AllTodos = await TodoModel.find({
        userId
    })
    res.json({
        AllTodos
    })
})


module.exports = {
    userRouter:userRouter,
    JWT_SECRET
}