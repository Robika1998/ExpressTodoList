import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  removeTask,
  getTaskById,
} from "../controller/ToDoController";
import { authenticateJWT } from "../midddlawere/authMiddlawere";

const router = Router();

router.route("/task").get(authenticateJWT, getAllTasks).post(createTask);
router.route("/task/:id").get(getTaskById).put(updateTask).delete(removeTask);

export default router;
