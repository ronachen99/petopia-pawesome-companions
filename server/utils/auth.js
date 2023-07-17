// imports the jsonwebtoken library
const jwt = require("jsonwebtoken");
// a secret string that will be used to sign and verify the JWTs
const secret = "mysecretsshhhhh";
// expiration time
const expiration = "2h";

// exports the object with functions and variables to be used in other modules
module.exports = {
  authMiddleware({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // the set up for the authorization looks like this: ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      // pops off the Bearer
      token = token.split(" ").pop().trim();
    }

    // if no token is found, return the origin req object
    if (!token) {
      return req;
    }

    // if token is found, try to verify with provided expiration and secret options
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.error(err);
      console.log("Invalid token");
    }
    return req;
  },

  // generate a token with the provided email and id parameters
  signToken({ email, _id }) {
    const payload = { email, _id };
    // returns a JWT
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
