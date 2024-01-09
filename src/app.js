const express = require("express");
const userController = require('./controller/userController');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/:id', userController.getUserWithUserIf);
app.post('/api/v1/users', userController.createUser);
app.put('/api/v1/users/:id', userController.updateUserDetails);
app.delete('/api/v1/users/:id', userController.deleteUserById);

//  Page Not Found error handler
app.use((req, res) => {
    res.status(404).json({ error: 'Page not found' });
});

// Start the server
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
