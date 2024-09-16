import { Request, Response } from "express";
import Task from "../models/ToDoModel";

// Get All Tasks with Search and Pagination
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { name, isDone, Date, page = 1, limit = 5 } = req.query;

    const query: any = {};

    if (name) {
      query.task = { $regex: name, $options: "i" };
    }
    if (isDone) {
      query.isDone = isDone === "true";
    }
    if (Date) {
      query.Date = Date;
    }

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const tasks = await Task.find(query)
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber);

    const totalTasks = await Task.countDocuments(query);

    res.json({
      totalPages: Math.ceil(totalTasks / limitNumber),
      currentPage: pageNumber,
      totalTasks,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Create a new Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { task, isDone, Date } = req.body;
    if (!task || !Date) {
      res.status(405).json("all the values need to be filled");
    }

    await Task.create({ task, isDone, Date });
    res.status(201).json("New Data Has Been Created");
  } catch (error) {
    res.status(500).json({ message: "Error ", error });
  }
};

// Update a Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, isDone, Date } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isDone, Date },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Remove a Task
export const removeTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Get Task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};
