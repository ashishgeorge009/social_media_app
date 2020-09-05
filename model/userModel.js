const connection = require("./connection");
const { v4: uuidv4 } = require('uuid');


// query
// create
create = (userObj) => {
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
getById = (uid) =>{
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
// send request
// recieve request
module.exports.create = create; 
module.exports.getById = getById;