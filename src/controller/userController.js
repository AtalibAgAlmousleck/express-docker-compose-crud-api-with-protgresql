const { pool } = require("../connection/connect");

//! fetch all users
const getAllUsers = async function (req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//! create user
const createUser = async function (req, res) {
  const { name, username, email } = req.body;

  if (!name || !username || !email) {
    res.status(400).json({
      error: "Name, username, and email are required",
    });
    return;
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, username, email) VALUES ($1, $2, $3) RETURNING *",
      [name, username, email]
    );
    res.status(201).json({ message: "User inserted success", user: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//! fetch user by id
const getUserWithUserIf = async function (req, res) {
  const userId = parseInt(req.params.id);
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "User with the given detail not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//! method to update user detail
const updateUserDetails = async function (req, res) {
  const userId = parseInt(req.params.id);
  const { name, username, email } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE users SET name = $1, username = $2, email = $3 WHERE id = $4 RETURNING *",
      [name, username, email, userId]
    );
    if (rows.length > 0) {
      res.json({ message: "User details updated success", user: rows[0] });
    } else {
      res
        .status(404)
        .json({ message: "User with the given details not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error " });
  }
};

const deleteUserById = async function (req, res) {
  const userId = parseInt(req.params.id);

  try {
    const { rows } = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );
    if (rows.length > 0) {
      res.json({ message: "User deleted successfully", user: rows[0] });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// modules
module.exports = {
  createUser,
  getAllUsers,
  getUserWithUserIf,
  updateUserDetails,
  deleteUserById,
};
