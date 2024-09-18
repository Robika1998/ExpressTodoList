import { Router } from "express";
import { ToDoController } from "../controller/ToDoController";
import { ToDoService } from "../services/ToDoService";
import { authenticateJWT } from "../midddlawere/authMiddlawere";

const router = Router();
const toDoService = new ToDoService();
const toDoController = new ToDoController(toDoService);

router
  .route("/task")
  .get(authenticateJWT, toDoController.getAllTasks.bind(toDoController))
  .post(toDoController.createTask.bind(toDoController));

router
  .route("/task/:id")
  .get(toDoController.getTaskById.bind(toDoController))
  .put(toDoController.updateTask.bind(toDoController))
  .delete(toDoController.removeTask.bind(toDoController));

export default router;
