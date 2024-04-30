const jwt1 = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt1.sign({id}, process.env.JWT_SECRET , {
        expiresIn: "30d",
    });
};

module.exports = generateToken;


// const jwt1 = require('jsonwebtoken')

// const generateTokenNew = (id) => {
//     return jwt1.sign({id}, process.env.JWT_SECRET , {
//         expiresIn: "60d",
//     });
// };

// module.exports = generateTokenNew;