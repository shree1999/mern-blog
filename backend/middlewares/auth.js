import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decode.id });
    if (!user) {
      return res.status(401).send({ error: "Not Authorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).send({ error: "No or invalid token present" });
  }
};
