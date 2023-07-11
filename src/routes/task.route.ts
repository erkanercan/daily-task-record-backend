import express from "express";
import {
  changeCategoryHandler,
  createTaskHandler,
  getAllTasksHandler,
  getTaskHandler,
  updateTaskHandler,
} from "../controllers/task.controller";
import { validate } from "../middlewares/validate";
import {
  changeTaskCategorySchema,
  changeTaskStatusSchema,
  taskSchema,
  updateTaskSchema,
} from "../schemas/task.schema";
import { requireUser } from "../middlewares/requireUser";
import { deserializeUser } from "../middlewares/deserializeUser";

const router = express.Router();
router.use(deserializeUser, requireUser);

router.post("/", validate(taskSchema), createTaskHandler);
router.put("/:id", validate(updateTaskSchema), updateTaskHandler);
router.post(
  "/:id/category",
  validate(changeTaskCategorySchema),
  changeCategoryHandler
);
router.post(
  "/:id/status",
  validate(changeTaskStatusSchema),
  changeCategoryHandler
);
router.get("/:id", getTaskHandler);
router.get("/", getAllTasksHandler);

export default router;
