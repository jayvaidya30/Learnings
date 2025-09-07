const express = require("express");
const {UserModel, TodoModel} = require("./db")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://jayvaidya30:gyoqOmkj2Cy061Sw@cluster0.86xlhas.mongodb.net/todo-jay-1");
const app = express();
const JWT_SECRET = "secret";
app.use(express.json());

app.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "You are logged in"
    })

})

app.post("/signin", async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    console.log(user);

    if(user){
        let token = jwt.sign({
            id: user._id.toString() //payload - what json data do you want to store in here to give it a token
        },JWT_SECRET)
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Invalid credentials"
        })
    }


})

app.post("/todo", auth, (req,res)=>{

})

app.get("/todos", auth, (req,res)=>{

})


function auth(req,res,next){
    const token = req.headers.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    if(decodedData){
        req.userId = decodedData.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
}



app.listen(3000);