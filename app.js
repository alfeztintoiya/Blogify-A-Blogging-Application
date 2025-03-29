const express = require('express')
const Blog = require("./models/blog");
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require("dotenv").config()
const path = require('path')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const app = express()

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then((e)=>console.log("Mongodb Connected.."));

//routes
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

app.set('view engine','ejs')
app.set('views',path.resolve("./views"))

app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))


app.get("/logo",(req,res)=>{
    return res.render("logo");
});

app.get("/",async (req,res)=>{
    if(!req.user){
        return res.redirect("/user/login");
    }

    try {
        const allBlog = await Blog.find({ });
        return res.render("home",{
            user: req.user,
            blog: allBlog,
        });
    } catch (error) {
        return res.status(500).send("Internal Server Error..");
    }
});

app.get("/myblog",async (req,res)=>{
    if(!req.user){
        return res.redirect("/user/login");
    }

    try {
        const allBlog = await Blog.find({ createdBy: req.user._id });
        return res.render("myblog",{
            user: req.user,
            blog: allBlog,
        });
    } catch (error) {
        return res.status(500).send("Internal Server Error..");
    }
});

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT , ()=> console.log(`Server Started at http://localhost:${PORT}/`));