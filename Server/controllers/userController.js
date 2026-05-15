import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing Details" });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      password: hashedpass,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error("Error in signing up the user:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      res.json({ success: false, messgae: "Invalid Credantials" });
    }

    const result = await bcrypt.compare(password, userData.password);

    if (!result) {
      res.status(400).json({ success: false, messgae: "Invalid Credantials" });
    }
    const token = await jwt.sign(
      { id: userData._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({ success: true, userData, token, message: "Login succesfull" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login failed due to Server" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Fetching failed due to Server" });
  }
};

const getUserProfile = async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findById(userID).select("-password");
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Cannot fetch user Profile due to Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  const userID = req.params.id;
  const { email, password } = req.body;

  try {
    let updatedFields = {};

    if (email) {
      updatedFields.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedpass = await bcrypt.hash(password, salt);
      updatedFields.password = hashedpass;
    }

    const user = await User.findByIdAndUpdate(userID, updatedFields, {
      returnDocument: "after",
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile Updated",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot Update due to Server error" });
  }
};

const deleteUserProfile = async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userID);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot Delete due to Server error" });
  }
};

export {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
