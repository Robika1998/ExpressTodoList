import { Request, Response } from "express";
import Task from "../models/ToDoModel";
import moment from "moment";

export class ToDoService {
  async getAllTasks(req: Request, res: Response) {
    const {
      name,
      isDone,
      Date,
      startDate,
      endDate,
      page = 1,
      limit = 5,
    } = req.query;
    const query: any = {};

    if (
      startDate &&
      typeof startDate === "string" &&
      endDate &&
      typeof endDate === "string"
    ) {
      query.Date = {
        $gte: moment(startDate).startOf("day").toDate(),
        $lte: moment(endDate).endOf("day").toDate(),
      };
    }

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

    return {
      totalPages: Math.ceil(totalTasks / limitNumber),
      currentPage: pageNumber,
      totalTasks,
      tasks,
    };
  }

  async createTask(req: Request) {
    const { task, isDone } = req.body;
    if (!task) {
      throw new Error("All fields need to be filled");
    }
    await Task.create({ task, isDone });
    return "New task has been created";
  }

  async updateTask(req: Request) {
    const { id } = req.params;
    const { task, isDone, Date } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isDone, Date },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }
    return updatedTask;
  }

  async removeTask(req: Request) {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      throw new Error("Task not found");
    }
    return "Task deleted successfully";
  }

  async getTaskById(req: Request) {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }
}
