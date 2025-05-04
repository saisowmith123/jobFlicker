const JobUser = require("../models/jobUser");

exports.createUser = async (req, res) => {
  try {
    const { name, email, role, passwordHash } = req.body;

    const existingUser = await JobUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new JobUser({ name, email, role, passwordHash });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, passwordHash } = req.query;
    console.log(email, passwordHash);
    const user = await JobUser.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userName = user.name;

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const update = req.body;

    const updatedUser = await JobUser.findByIdAndUpdate(userId, update, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await JobUser.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
