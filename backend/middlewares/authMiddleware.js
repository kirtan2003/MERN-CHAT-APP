const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async(req, res, next) => {
    let token1;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token1 = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token1, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch(error){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token1){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = {protect};




// const jwt = require('jsonwebtoken');
// const User = require('../Models/userModel');
// const asyncHandler = require('express-async-handler');

// const protect = asyncHandler(async(req, res, next) => {
//     let token;
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//         return res.status(401).send("Not authorized, no token");
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Find user by decoded id and attach to request
//         req.user = await User.findById(decoded.id).select("-password");

//         if (!req.user) {
//             return res.status(401).send("User not found");
//         }

//         next();
//     } catch(error) {
//         console.error("Error verifying token:", error);
//         return res.status(401).send("Not authorized, token failed");
//     }
// });

// module.exports = { protect };
