const userDB = require("../model/user.json");
const userModel = require("../model/userModel");


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
        var upUser= await userModel.update(cid,req.body)
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
    userArr = await userModel.getById(cUid);
    // console.log(req.params);
    res.status(201).json({
        status: "success",
        user: userArr.length == 0 ? "no user" : userArr[0]
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

module.exports.getAllUser = getAllUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.createUser = createUser;