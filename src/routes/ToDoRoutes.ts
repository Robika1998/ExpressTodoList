import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  removeTask,
  getTaskById,
} from "../controller/ToDoController";

const router = Router();

router.route("/task").get(getAllTasks).post(createTask);
router.route("/task/:id").get(getTaskById).put(updateTask).delete(removeTask);

export default router;
