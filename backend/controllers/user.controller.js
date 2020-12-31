import { User } from "../models/user.model.js";

/*
  @route   POST /api/v1/users/register  
  @access  public
  @desc    allow users to register on the website
*/
export const registerUser = async (req, res) => {
  const { error } = User.validateBody(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  try {
    const user = new User(req.body);
    await user.save();
    const token = user.getAuthToken();

    res.send({ token });
  } catch (err) {
    if (err.code === 11000 && err.keyValue["email"]) {
      return res.status(400).send({ error: "This email is already in use." });
    }
    if (err.code === 11000) {
      return res.status(400).send({ error: "This username is already taken" });
    }

    res.status(500).send({ error: err.message });
  }
};

/*
  @route   POST /api/v1/users/login
  @access  public
  @desc    allow users to login
*/
export const loginUser = async (req, res) => {
  const { userInput, password } = req.body;
  let user;
  try {
    if (userInput.indexOf("@") === -1) {
      user = await User.findByCredentials(userInput, password, "u");
    } else {
      user = await User.findByCredentials(userInput, password, "e");
    }

    const token = user.getAuthToken();
    res.send({ token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

/*
  @route   GET /api/v1/users/me
  @access  private
  @desc    get the details of the authenticated user
*/
export const getAuthUser = (req, res) => {
  res.send({ user: req.user });
};

/*
  @route   DELETE /api/v1/users/me
  @access  private
  @desc    Allow users to delete profile
*/
export const deleteUser = async (req, res) => {
  try {
    await req.user.remove();

    res.send("Account deleted successfully");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

/*
  @route   PUT /api/v1/users/me
  @access  private
  @desc    Allow users to update profile
*/
export const updateUser = async (req, res) => {
  const { error } = User.validateUpdateBody(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  try {
    const givenUpdates = Object.keys(req.body);
    givenUpdates.forEach(update => (req.user[update] = req.body[update]));

    await req.user.save();
    res.send();
  } catch (err) {
    if (err.code === 11000 && err.keyValue["email"]) {
      return res.status(400).send({ error: "This email is already in use." });
    }
    if (err.code === 11000) {
      return res.status(400).send({ error: "This username is already taken" });
    }

    res.status(500).send({ error: err.message });
  }
};

/*
  @route   DELETE /api/v1/users/me/avatar
  @access  private
  @desc    allow users to delete their profile image
*/
export const deleteAvatar = async (req, res) => {
  try {
    if (!req.user.avatar) {
      throw new Error("No Image Availaible");
    }
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
