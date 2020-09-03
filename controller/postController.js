const { v4: uuidv4 } = require('uuid');
const getAllPost = (req, res) => {
    // req paramatere -> post id
    // console.log(req.params);
    res.status(201).json({
        status: "success",
        postDB: postDB
    })
}
const updatePost = (req, res) => {
    let post = getpostById(req.params.uid);
    let toBeUpdatedObj = req.body;
    // post , obj
    // post.something
    for (let key in toBeUpdatedObj) {
        console.log(key);
        post[key] = toBeUpdatedObj[key];
    }
    fs.writeFileSync(path.join(__dirname, "../model/post.json"), JSON.stringify(postDB));
    res.status(200).json({
        status: "success",
        post: post
    })

}
const deletePost = (req, res) => {
    let cid = req.params.uid;
    console.log(postDB.length);
    postDB = postDB.filter((post) => { return post.uid != cid; })
    fs.writeFileSync(path.join(__dirname, "../model/post.json"), JSON.stringify(postDB));
    res.status(200).json({
        status: "success",
        postDB,
        length: postDB.length
    })
}
const getPost = (req, res) => {
    // req paramatere -> post id
    let cUid = req.params.uid;
    let postArr = postDB.filter((post) => {
        return post.uid == cUid;
    });
    console.log(req.params);
    res.status(201).json({
        status: "success",
        post: postArr.length == 0 ? "no post" : postArr[0]
    })
    // next()
}
const createPost = (req, res) => {
    let post = req.body;
    // console.log(post);
    post.uid = uuidv4();
    postDB.push(post);
    // saved to disk
    fs.writeFileSync(path.join(__dirname, "../model/post.json"), JSON.stringify(postDB));
    // res
    // res.status(201).json({
    //     status: "success",
    //     post: req.body
    // })
}

module.exports.getAllPost = getAllPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.getPost = getPost;
module.exports.createPost = createPost;