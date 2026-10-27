import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { loginModel } from "../models/authModel";

export const login = (
  req: any,
  res: any
) => {

  const { username, password } = req.body;

  loginModel(
    username,
    async (err: any, result: any[]) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "Invalid Username",
        });
      }

      const user = result[0];

      // Compare entered password with hashed password
      const validPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      res.json({
        message: "Login Successful",
        token,
        admin: {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
        },
      });

    }
  );

};