const router = require('express').Router();
const Task = require('../models/task');
const User = require('../models/user');
const { authenticateToken } = require('../routes/auth');

//Create Task API
router.post("/create-task", authenticateToken, async (req, res) => {
    try { 
        const { title, description } = req.body;  
        const userId = req.user.id;  

        if (!userId) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        // Create a new task and ensure `complete` is explicitly set to false
        const newTask = new Task({ 
            title, 
            description, 
            userId, 
            complete: false // ✅ Ensures the field is always present
        });

        const savedTask = await newTask.save();

        // Update user's task list
        await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

        res.status(200).json({ 
            message: "Task created successfully", 
            task: savedTask 
        });

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//Get All Tasks API
router.get("/get-all-tasks", authenticateToken, async (req, res) => { 
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found in the database" });
        }

        res.status(200).json({ 
            message: "All tasks retrieved successfully",
            tasks
        });

    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Delete Task API
router.delete("/delete-task/:id", authenticateToken, async (req, res) => { 
    try {
        const { id } = req.params;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } }); 

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Update Task API
router.put("/update-task/:id", authenticateToken, async (req, res) => { 
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        await Task.findByIdAndUpdate(id, { title, description });

        res.status(200).json({ message: "Task updated successfully" });

    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Mark Task as Important API
router.put("/update-important-task/:id", authenticateToken, async (req, res) => { 
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.important = !task.important;
        await task.save();

        res.status(200).json({ 
            message: "Task importance updated successfully", 
            task 
        });

    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Mark Task as Completed API
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => { 
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.complete = !task.complete;
        await task.save();

        res.status(200).json({ 
            message: "Task completion status updated successfully", 
            task 
        });

    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Get Important Tasks API
router.get("/get-imp-task", authenticateToken, async (req, res) => { 
    try {
        const userId = req.user.id;
        const importantTasks = await Task.find({ userId, important: true }).sort({ createdAt: -1 });

        if (!importantTasks.length) {
            return res.status(404).json({ message: "No important tasks found" });
        }

        res.status(200).json({ 
            message: "Important tasks retrieved successfully",
            tasks: importantTasks
        });

    } catch (error) {
        console.error("Error retrieving important tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get Completed Tasks API
router.get("/get-comp-task", authenticateToken, async (req, res) => { 
    try {
        const userId = req.user.id;
        const completedTasks = await Task.find({ userId, complete: true }).sort({ createdAt: -1 });

        if (!completedTasks.length) {
            return res.status(404).json({ message: "No completed tasks found" });
        }

        res.status(200).json({ 
            message: "Completed tasks retrieved successfully",
            tasks: completedTasks
        });

    } catch (error) {
        console.error("Error retrieving completed tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get Incomplete Tasks API
router.get("/get-incomplete-task", authenticateToken, async (req, res) => { 
    try {
        const userId = req.user.id;  // Ensure userId is correct

        // Debugging: Log userId and query conditions
        console.log("Fetching incomplete tasks for userId:", userId);

        const incompleteTasks = await Task.find({ 
            userId, 
            $or: [
                { complete: false }, 
                { complete: { $exists: false } }  // Ensure we get tasks missing 'complete'
            ]
        }).sort({ createdAt: -1 });

        console.log("Found tasks:", incompleteTasks);  // Log the retrieved tasks

        if (!incompleteTasks.length) {
            return res.status(404).json({ message: "No incomplete tasks found" });
        }

        res.status(200).json({ data: incompleteTasks });

    } catch (error) {
        console.error("Error retrieving incomplete tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
