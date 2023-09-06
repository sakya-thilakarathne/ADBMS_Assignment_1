const db = require("../dbconnection"); // Import the database connection

// Create a new user
exports.createUser = (req, res) => {
  const { name, password, role } = req.body;
  const query = "INSERT INTO user (name, password, role) VALUES (?, ?, ?)";

  db.query(query, [name, password, role], (err, results) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user");
    } else {
      res.json({
        message: "User created successfully",
        userId: results.insertId,
      });
    }
  });
};

// Retrieve all users
exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM user";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
};

// Retrieve a user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM user WHERE id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      res.status(500).send("Error fetching user");
    } else {
      if (results.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.json(results[0]);
      }
    }
  });
};

// Update a user by ID
exports.updateUserById = (req, res) => {
  const userId = req.params.id;
  const { name, password, role } = req.body;
  const query = "UPDATE user SET name = ?, password = ?, role = ? WHERE id = ?";

  db.query(query, [name, password, role, userId], (err, results) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Error updating user");
    } else {
      res.json({ message: "User updated successfully" });
    }
  });
};

// Delete a user by ID
exports.deleteUserById = (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM user WHERE id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
};
