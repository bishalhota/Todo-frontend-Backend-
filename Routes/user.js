const {Router} = require("express");
const {userModel,TodoModel} = require("../Db/db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sanvi8724"





userRouter.post("/signup",async function(req,res){
    const{firstname,Lastname,email,password} = req.body;

    await userModel.create({
        firstname:firstname,
        Lastname:Lastname,
        email:email,
        password:password
    });

    res.json({
        msg:"Signup Initiated"
    })
})


userRouter.post("/signin",async function(req,res){
    const{email,password} = req.body;

    const user = await userModel.findOne({
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

    const{Title,description,Done,creatorid} = req.body; 

    const NewTodo = await TodoModel.create({
        Title:Title,
        description:description,
        Done:Done,
        CreatorId:creatorid
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

userRouter.delete("/deleteTodo", auth, async function (req, res) {
    const userId = req.userId; // Extract the authenticated user's ID from the request
    const { todoId } = req.body; // Get the todo ID from the request body

    try {
        // Find the todo by ID and ensure it belongs to the authenticated user
        const todo = await TodoModel.findOne({ _id: todoId, CreatorId: userId });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found or you are not authorized to delete it.",
            });
        }

        // Delete the todo
        await TodoModel.deleteOne({ _id: todoId });

        res.status(200).json({
            message: "Todo deleted successfully!",
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({
            message: "An error occurred while deleting the todo.",
        });
    }
});



module.exports = {
    userRouter:userRouter,
    JWT_SECRET
}