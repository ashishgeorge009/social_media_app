const userDB = require("../model/user.json");
const userModel = require("../model/userModel");
const userFollowerModel = require("../model/user_followerModel");


const getAllUser = (req, res) => {
    // req paramatere -> user id
    // console.log(req.params);
    res.status(201).json({
        status: "success",
        userDB: userDB
    })
}
const updateUser = async (req, res) => {
    let cid = req.params.uid;
    try{
        var upUser= await userModel.update(cid,req.body);
        res.status(200).json({
            status: "success",
            updated: upUser
        })
    }catch(err){
        res.status(201).json({
            status: "failed",
            error : err.message
        })
    }
   
    

}
const deleteUser = async (req, res) => {
    let cid = req.params.uid;
    let userUp = req.body;
    try{
    userDel = await userModel.delete(cid, userUp);
    res.status(200).json({
        status: "success",
        deleted : userDel
        
    })
    }catch(err){
        res.status(201).json({
            status: "failed",
            error : err.message
        })
    }
}
const getUser = async (req, res) => {
    // req paramatere -> user id
    let cUid = req.params.uid;
    try{
        // {}
    user = await userModel.getById(cUid);
    // console.log(req.params);
    res.status(201).json({
        status: "success",
        user: user==undefined ? "no user" : user
    })}catch(err){
        res.status(201).json({
            status: "faliure",
            user: err.message
        })
    }
    // next()
}
const createUser = async (req, res) => {
    let user = req.body;
    // console.log(user);
    try {
        let nDBUser = await userModel.create(user);
        // res
        res.status(201).json({
            status: "success",
            user: nDBUser
        })
    } catch (err) {
        res.status(201).json({
            status: "success",
            "message": err.message
        })
    }
}

//send follow request
const createRequest = async (req, res) => {
    try {
        let uid = req.body.user_id;
        let follower_id = req.body.follower_id;
        await userFollowerModel.addPendingFollower(req.body);
        let { is_public } = await userModel.getById(uid);
        console.log(is_public);
        if (is_public == true) {
            console.log("public")
            await userFollowerModel.acceptRequest(uid, follower_id);
            return res.status(201).json({
                status: "success",
                "message": "request accepted"
            })
        }
         res.status(201).json({
            status: "pending",
            "message": "request is send user will accept it"
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }
}

// get ALL followers
const getAllFollowers = async (req, res) => {
    try {
        let result = await userFollowerModel.getAllFollowers(req.body);
        res.status(201).json({
            status: "success",
            "message": result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }

}

module.exports.getAllUser = getAllUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.createRequest = createRequest;
module.exports.getAllFollowers = getAllFollowers;