import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import transporter from '../config/emailConfig.js';

class UserController {
 
  static userRegistration = async (req, res) => {
          const password = req.body.password;
          const salf = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salf);
          const newUsers = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            phone: req.body.phone,
            gender: req.body.gender,
          };
          const user = getRepository(Users).create(newUsers);
          const result = await getRepository(Users).save(user);
      
  };

  static userLogin = async (req, res) =>{
      const { email, password } = req.body;
      if (email && password) {
        // console.log(jwt);
        
        const user = await getRepository(Users).findOne({ email });
        console.log(user);
        
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET_KEY as string);
            console.log(token);


            // getRepository(Users).merge(post, req.body);
            res.send({ status: 'success', message: 'Login Success', token });
            user.token = user.token;
            await getRepository(Users).merge(user);
            // console.log(user);
          }
        }
      }
  };  

  static changeUserPassword = async (req, res) => {
    //const user = await getRepository(Users).findOne()
    const id = res.params.user.id;
    console.log(id);

    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        return res.send({ status: 'failed', message: "New Password and Confirm New Password doesn't match" });
      }
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);
      await getRepository(Users).findOneOrFail(id);
      return res.send({ status: 'success', message: 'Password changed succesfully' });
    }
    return res.send({ status: 'failed', message: 'All Fields are Required' });
  };

};

export default UserController;
