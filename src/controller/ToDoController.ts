import { Request, Response } from "express";
import { ToDoService } from "../services/ToDoService";

export class ToDoController {
  private toDoService: ToDoService;

  constructor(toDoService: ToDoService) {
    this.toDoService = toDoService;
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.toDoService.getAllTasks(req, res);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks", error });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const message = await this.toDoService.createTask(req);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const updatedTask = await this.toDoService.updateTask(req);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error });
    }
  }

  async removeTask(req: Request, res: Response) {
    try {
      const message = await this.toDoService.removeTask(req);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const task = await this.toDoService.getTaskById(req);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error fetching task", error });
    }
  }
}
