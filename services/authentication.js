const JWT = require('jsonwebtoken')

const secret = process.env.JWT_SECRET;

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageURL,
        role: user.role,
    };

    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}