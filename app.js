const express = require("express");
const {userRouter} = require("./Routes/user");
const path = require("path");
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

app.use("/user",userRouter);



app.listen(3000);