const router = require('express').Router();
const Task = require('../models/task');
const User = require('../models/user');
const { authenticateToken } = require('../routes/auth');

// Create Task API
router.post("/create-task", authenticateToken, async (req, res) => {
    try { 
        const { title, description } = req.body;  

        // Ensure user is authenticated
        console.log("🔹 User from token:", req.user);
        const userId = req.user.id;  // Ensure the ID is being used correctly

        if (!userId) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        // Create a new task and associate it with the user
        const newTask = new Task({
            title,
            description,
            userId  // Store userId in task
        });

        const savedTask = await newTask.save();
        console.log("Task saved:", savedTask);

        // Update user's task list
        await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

        res.status(200).json({ message: "Task created successfully", task: savedTask });

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/get-tasks", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        const tasks = await Task.find({ userId });
        res.status(200).json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});  

module.exports = router; 
