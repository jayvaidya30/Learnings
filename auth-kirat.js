const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const JWT_SECRET ="USER_APP";
//JWT is used for authentication watch the Week6-6.1 for info


const users=[];

//random long string


app.post("/signup", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    // if(users.find(u=>u.username === username)){
    //     res.json({
    //         message: "You are already signedup"
    //     })
    // }

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "you are signed up"
    })

    console.log(users);

});


app.post("/signin", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const FoundUser = users.find(u => u.username === username);
    
    if(FoundUser){
        const token = jwt.sign({
            username: username
        },JWT_SECRET); // convert their username over to a jwt

        // FoundUser.token = token;
        res.send({
            token: token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }

    console.log(users);

});

app.get("/me", (req,res)=>{
    const token = req.headers.token //jwt
    const decodedIndformation = jwt.verify(token, JWT_SECRET); // {username: 'harkirat@mgmail.com'}
    const username = decodedIndformation.username;

    let FoundUser = null;

    for(let i=0;i<users.length;i++){
        if(users[i].username == username){
            FoundUser = users[i];
        }
    }

    if (FoundUser){
        res.json({
            username: FoundUser.username,
            password: FoundUser.password
        })
    } else {
        res.json({
            message: "token invalid"
        })
    }
})

app.listen(3000);