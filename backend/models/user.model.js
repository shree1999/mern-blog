import mongoose from "mongoose";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 16) {
          throw new Error("Age is restricted");
        }
      },
    },

    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByCredentials = async (value, password, type) => {
  let user;
  if (type === "u") {
    user = await User.findOne({ name: value });
  } else {
    user = await User.findOne({ email: value });
  }

  if (!user) {
    throw new Error("Invalid name/email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid name/email or password");
  }

  return user;
};

userSchema.statics.validateBody = data => {
  const schema = Joi.object({
    name: Joi.string().trim().min(5).max(30).alphanum(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "edu", "in"] },
      })
      .required(),
    password: Joi.string().min(8).required(),
    age: Joi.number().required(),
  }).with("email", "password");

  return schema.validate(data);
};

userSchema.statics.validateUpdateBody = data => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).alphanum(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "edu", "in"] },
    }),
    age: Joi.number().min(16),
  });

  return schema.validate(data);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
};

userSchema.methods.getAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

export const User = mongoose.model("User", userSchema);
