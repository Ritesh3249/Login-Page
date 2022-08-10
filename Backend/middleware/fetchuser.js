var jwt = require("jsonwebtoken");
var privateKey = process.env.USER_PRIVATE_KEY;

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token
  const token = req.cookies.auth;

  if (!token) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, privateKey);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
