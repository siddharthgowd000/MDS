const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const collection = require("./mongodb");
const session = require('express-session');
const {sessionconfig}=require('./session')
const { predictImage } = require('./api');
const { uploadToFirebaseStorage } = require('./upload_images');
const hbs = require("hbs");

const templatePath = path.join(__dirname, "../tempelates");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname}`;
        return cb(null, filename);
    }
});

const upload =multer({storage})

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/home",(req,res)=>{
    res.render('home')
})
app.use(session(sessionconfig));


app.get("/dashboard", async (req, res) => {
    const user = req.session.user;
    if(user){
    try {
        const useremail=user.email
        const images = await collection.findOne({email:useremail})
        console.log(images)
        res.render("dashboard", { images: images });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).send("Error fetching images");
    }
}
else{
    res.send("session time out")
}
});

app.post("/upload", upload.single("image"), async (req, res) => {

    if (!req.session.user) {
        res.status(401).send("Unauthorized: You must log in to upload images");
        return;
    }
    try {
        const image_url = await uploadToFirebaseStorage(req.file.path, req.file.filename);

        if (!req.session.user || !req.session.user.email) {
            console.error("Unauthorized access attempt. Please log in.");
            return res.status(401).send("Unauthorized");
        }
        
        const userEmail = req.session.user.email;
        var existingImages = await collection.findOne({ email:userEmail });
        console.log(existingImages)
        var imagepathArray = existingImages.imagepath;
        imagepathArray.push(image_url);

        predictImage(image_url)
            .then(data => {
                console.log(data);
                res.render("home", { data });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Internal Server Error");
            });
        
        const updated = await collection.updateOne(
        { email:userEmail }, 
        { $set: { imagepath: imagepathArray } } 
        )
        const print=await collection.findOne({email:userEmail})
        console.log(print)
        console.log(updated)
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).send("Error uploading image");
    }
});

app.post("/signup", async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    const existingUser = await collection.findOne({ email: data.email });
    if (existingUser) {
        res.send("User already exists with this email");
        return;
    }

    await collection.insertMany([data]);
    res.render("dashboard");
});

app.post("/login", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };
    const existingUser = await collection.findOne({ email: data.email });
    if (!existingUser) {
        res.send("User not found");
        return;
    }
    if (existingUser.password !== data.password) {
        res.send("Incorrect password");
        return;
    }
    req.session.user = { email: data.email,password:existingUser.password };
    res.render("home");
});

app.listen(3006, () => {
    console.log("Port connected");
});
