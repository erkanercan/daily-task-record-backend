import { NextFunction, Request, Response } from "express";
import {
  changeCategory,
  changeStatus,
  createTask,
  findAllTasks,
  findTaskById,
  updateTask,
} from "../services/task.service";
import { Types } from "mongoose";

export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = req.body;
    const user = res.locals.user;
    task.user = new Types.ObjectId(user._id);
    task.status = "backlog";
    const createdTask = await createTask(task);
    res.status(201).json({
      status: "success",
      data: {
        task: createdTask,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

export const updateTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

export const changeCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await changeCategory(req.params.id, req.body.category);
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

export const changeStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await changeStatus(req.params.id, req.body.status);
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

export const getTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await findTaskById(req.params.id);
    // see if the task user id is the same as the logged in user id
    // if not, return 401
    if (task?.user !== res.locals.user) {
      return res.status(401).json({
        status: "fail",
        message: "You are not authorized to access this task",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

export const getAllTasksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const tasks = await findAllTasks(query);
    res.status(200).json({
      status: "success",
      result: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};
