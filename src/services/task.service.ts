import { FilterQuery } from "mongoose";
import taskModel, { Task } from "../models/task.model";

export const createTask = async (input: Task) => {
  const task = await taskModel.create(input);
  return task;
};

export const updateTask = async (id: string, input: Partial<Task>) => {
  const task = await taskModel.findByIdAndUpdate(id, input, { new: true });
  return task;
};

export const changeCategory = async (id: string, category: string) => {
  //Check if category is valid
  if (category !== "bug" && category !== "feature" && category !== "refactor") {
    throw new Error("Invalid category");
  } // FIXME: I know that this is not the best way to do this, but I will definitely fix it in the next chapter
  const task = await taskModel.findByIdAndUpdate(
    id,
    { category },
    { new: true }
  );
  return task;
};

export const changeStatus = async (id: string, status: string) => {
  //Check if status is valid
  if (status !== "backlog" && status !== "in_progress" && status !== "done") {
    throw new Error("Invalid status");
  }

  const task = await taskModel.findByIdAndUpdate(id, { status }, { new: true });
  return task;
};

export const findTaskById = async (id: string) => {
  const task = await taskModel.findById(id).lean();
  return task;
};

export const findAllTasks = async (query?: FilterQuery<Task>) => {
  //If given query has createdAt or updatedAt fields, we need to find tasks that are that exact date, not time included
  //For example, if createdAt is 2021-01-01T12:00:00.000Z, we need to find tasks that are created at 2021-01-01
  //We can do this by converting the date to string and then converting it back to date
  if (query?.createdAt) {
    const createdAt = new Date(query.createdAt as string);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();
    const date = createdAt.getDate();
    query.createdAt = {
      $gte: new Date(year, month, date),
      $lt: new Date(year, month, date + 1),
    };
  }
  if (query?.updatedAt) {
    const updatedAt = new Date(query.updatedAt as string);
    const year = updatedAt.getFullYear();
    const month = updatedAt.getMonth();
    const date = updatedAt.getDate();
    query.updatedAt = {
      $gte: new Date(year, month, date),
      $lt: new Date(year, month, date + 1),
    };
  }
  if (query?.text) {
    query.text = {
      $regex: query.text as string,
      $options: "i",
    };
  }
  if (query?.taskDay) {
    const taskDay = new Date(query.taskDay as string);
    const year = taskDay.getFullYear();
    const month = taskDay.getMonth();
    const date = taskDay.getDate();
    query.taskDay = {
      $gte: new Date(year, month, date, 0, 0, 0, 0),
      $lt: new Date(year, month, date + 1, 0, 0, 0, 0),
    };
    console.log(query.taskDay);
  }

  console.log(query);

  return await taskModel
    .find({ ...query })
    .populate("user")
    .lean();
};
