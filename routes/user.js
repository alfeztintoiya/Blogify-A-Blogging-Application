const express = require('express')
const { handleLogin , handleSignUp , handleSignUpAuth, handleLoginAuth} = require("../controllers/auth")
const router = express.Router();

router.get("/login",handleLogin);

router.get("/signup",handleSignUp);

router.post("/signup",handleSignUpAuth);

router.post("/login",handleLoginAuth);

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
});

module.exports = router;