const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../const');


module.exports = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName
    };

    let token = jwt.sign(payload, SECRET_KEY);

    return token;
}
