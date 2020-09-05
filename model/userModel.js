const connection = require("./connection");
const { v4: uuidv4 } = require('uuid');


// query
// create
var create = (userObj) => {
// insert 
userObj.uid = uuidv4();
// create user 
return new Promise(function (resolve, reject) {
    connection.query("INSERT INTO user SET ?", userObj, function (err, res) {
        if (err) {
            reject(err)
            return;
        } else {
            resolve(res);
        }
    })
})
}
// get
var getById = (uid) =>{
    return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM user WHERE uid="${uid}"`,
         function(err,res){
            if (err) {
                reject(err)
                return;
            } else {
                resolve(res);
            }
        })
    })
    
}
// update delete
var Delete = (uid) =>{
    return new Promise(function(resolve,reject){
        connection.query(`DELETE FROM user WHERE uid="${uid}"`,
         function(err,res){
            if (err) {
                reject(err)
                return;
            } else {
                resolve(res);
            }
        })
    })
    
    
}
var update = (uid, userObj) =>{
    var keys = Object.keys(userObj);
    let response=[];
    return new Promise(function(resolve, reject){
    
    for(i=0;i<keys.length;i++){
        connection.query(`UPDATE user SET ${keys[i]}= "${userObj[keys[i]]}" WHERE uid="${uid}"`,userObj,
        function(err,res){
            if (err) {
                reject(err)
                return;
            }else if(i===keys.length){
                console.log("hello")
                resolve(response);
            } 
            else{
            response.push(res);
            console.log(res);
            
            }
        })
    }
    })
}
// send request
// recieve request
module.exports.create = create; 
module.exports.getById = getById;
module.exports.delete = Delete;
module.exports.update = update;