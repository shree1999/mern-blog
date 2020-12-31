import express from "express";
import multer from "multer";
import sharp from "sharp";

import {
  registerUser,
  loginUser,
  getAuthUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router
  .route("/me")
  .get(auth, getAuthUser)
  .delete(auth, deleteUser)
  .put(auth, updateUser);

// below route for updating profile picture
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Image type should only be jpg, jpeg or png"), false);
    }
    cb(null, true);
  },
});
router.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const avatar = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = avatar;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
export default router;
