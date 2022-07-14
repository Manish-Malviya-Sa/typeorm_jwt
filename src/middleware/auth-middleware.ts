/* eslint-disable prefer-destructuring */
import * as jwt from 'jsonwebtoken';
import { Users } from "../entity/Users";
import { getRepository } from "typeorm";

const checkUserAuth = async (req, res, next) => {
  let token;
 console.log(token);
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // // Get Token from header
      token = authorization.split(' ')[1];

      // // Verify Token
      // const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // // Get User from Token
     //  req.user = await getRepository(Users).findByIds(id),  //.select('-password');

      // next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: 'failed', message: 'Unauthorized User' });
    }
  }
  if (!token) {
    res.status(401).send({ status: 'failed', message: 'Unauthorized User, No Token' });
  }
};

export default checkUserAuth;
