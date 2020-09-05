//  api making framework
const express = require("express");
const fs = require("fs");
const path = require("path");
// const { response } = require("express");
const userRouter = require("./router/userRoutes");
const app = express();
// // for accepting data in req.body
//  it will always run
// user defined

// user defined middleware
// it tracks json obj in http body and add it to req.body
app.use(express.json());

// get => some changing parameter 
// getOne
// npm i uuid
// npm i nodemon --save-dev
// /api/v1/user/:uid=>userRouter 
// api/v1/post/:uid=> postRouter
// router created
// 
// localhost:3000/api/v1/user/:uid
app.use("/api/v1/user", userRouter);
// app.use("/api/v1/post", postRouter);

// 404 route 
app.use("*", (req, res) => {
    res.status(404).json({
        "status": "failure",
        "message": "resource not found"
    })
})
// userDB.splice(idx,1);
// get ,post ,patch ,delete => express methods
// 127.0.0.1:3000=> localhost:3000/home
// get All=> admin
// get=> particular a user
// post => create  a user 
// update => update a user
// delete a user
// name,password,handle,image_url,bio,uid,email
// https://www.flipkart.com/television-store/
// protocol// web.hostname.subdomain/route 
app.listen(3000, () => {
    console.log("Server started at port 3000");
})
