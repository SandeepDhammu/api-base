import user from "../models/user.js";
import jwt from "jsonwebtoken";

const secret = "erqjlRUjsjYW2WSq7LzqShBOYngQZPz8";

export const validateToken = async (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
         return res.status(403).send({
              success: false,
              message: 'token is required.',
         });
    }

    try {
         let claims = jwt.verify(token, secret);
         let session = await user.findById(claims.user);

         if (!session) {
              return res.status(403).send({
                   success: false,
                   message: 'user not found',
              });
         }

         req.user = session;
         next();
    } catch (err) {
         if (err.name === 'TokenExpiredError') {
              return res.failure('Session Expired');
         }
         return res.failure(err);
    }
};