checkBody = function (req, res, next) {
    console.log("I will run after express.json");
    let keysArray = Object.keys(req.body);
    if (keysArray.length == 0) {
        res.status(200).json({
            "status": "failure",
            "message": "Body Could not be empty"
        })
    } else {
        next();
    }
}
module.exports.checkBody = checkBody;