const express = require('express');
const cors = require('cors')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require('./models/Post')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const fs = require('fs');
const path = require('path');

var salt = bcrypt.genSaltSync(10);
const secretKey = "23fas21ad231231jd"

const app = express();
const upload = multer({ dest: 'uploads/' })
app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json())
app.use(cookieParser())

mongoose.connect('mongodb+srv://BlogWeb:SZRgmi5Lj8f1dINi@cluster0.ousdupv.mongodb.net/?retryWrites=true&w=majority');

app.post("/register", async (req, res) =>{
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt)})
        res.json(userDoc)
    } catch (e) {
        res.status(400).json(e);
    }

});

app.post("/login", async (req, res) =>{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passwordTrue =  bcrypt.compareSync(password, userDoc.password);
    if (passwordTrue) {
        jwt.sign({username, id : userDoc._id}, secretKey, {}, (err, token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:userDoc._id,
                username,
            });
        })
    } else {
        res.status(400).json("Wrong Username/Password");
    }
});


app.get('/profile', (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, secretKey, {}, (err,info)=>{
        if(err) throw err;
        res.json(info);
    })
})

app.post("/logout" , (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post("/post", upload.single('file') , async (req,res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {title, summary, content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        coverImg: newPath
    })
    res.json(postDoc);
})


app.get("/post", async (req, res) => {
    const Posts = await Post.find();
    res.json(Posts);   
})

app.listen(3000);


// mongodb+srv://BlogWeb:SZRgmi5Lj8f1dINi@cluster0.ousdupv.mongodb.net/?retryWrites=true&w=majority