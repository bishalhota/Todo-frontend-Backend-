const express = require("express");
const {userRouter} = require("./Routes/user");
const app = express();
app.use(express.json());

app.use("/user",userRouter);



app.listen(3000);