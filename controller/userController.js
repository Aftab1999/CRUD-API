const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");
const Users = require("../schema/userSchema");
const uuidValidate = require("uuid-validate");

exports.addUser = async (req, res) => {
  try {
    const { username, age, hobbies } = req.body;

    // Validate request body
    if (!username || !age) {
      return res
        .status(400)
        .json({ error: "Username and age are required fields." });
    }

    // Create a new user object
    const newUser = {
      username,
      age,
      hobbies,
    };

    // Add the user to the database using User.create
    let result = await Users.create(newUser);

    // Respond with the newly created user
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  const userId = req.params.id;

  // Validate userId as a UUID
  if (!uuidValidate(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    // Find user by ID and update
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an existing user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  // Validate userId as a UUID
  if (!uuidValidate(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    // Find user by ID and delete
    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).send({ message: "User Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllUsersDetails = async (req, res) => {
  try {
    let body = req.body;
    let data = await Users.find(body);

    if (data && data.length > 0) {
      res.status(200).send({ message: "Users Details", data: data });
    } else {
      res.status(404).send({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getUserDetailsById = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Users.findOne({ _id: id });

    if (data) {
      res.status(200).send({ message: "User Details", data: data });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
