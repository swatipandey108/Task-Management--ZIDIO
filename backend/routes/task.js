const router = require('express').Router();
const Task = require('../models/task');
const User = require('../models/user');
const { authenticateToken } = require('../routes/auth');

// Create Task API
router.post("/create-task", authenticateToken, async (req, res) => {
    try { 
        const { title, description } = req.body;
        
        // Ensure user is authenticated and has an ID
        const userId = req.user.id; 
        if (!userId) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        // Create a new task
        const newTask = new Task({
            title,
            description,
        });

        const savedTask = await newTask.save();
        const taskId = savedTask._id;

        // Update user's task list
        await User.findByIdAndUpdate(userId, { $push: { tasks: taskId } });

        res.status(200).json({ message: "Task created successfully", task: savedTask });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
