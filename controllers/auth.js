const User = require("../models/user");

function handleLogin(req,res){
    return res.render("login");
}

function  handleSignUp(req,res){
    return res.render("signup");
}

async function handleSignUpAuth(req,res){
    const { name , email , password } = req.body;

    // const entry = User.find((e) => e.email === email);
    // if(entry !=  -1){
    //     return res.json({ err: "User already exists.."});
    // }

    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/");
}

async function handleLoginAuth(req,res){
    const {email , password} = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email , password);    
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("login",{
            error: "Incorrect Email or Password"
        });
    }
}

module.exports = {
    handleLogin,
    handleSignUp,
    handleSignUpAuth,
    handleLoginAuth
}