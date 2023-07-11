import { TypeOf, ZodEnum, date, object, string } from "zod";

export const taskSchema = object({
  body: object({
    taskDay: string({
      required_error: "Task day is required",
    }),
    text: string({
      required_error: "Task text is required",
    }),
    category: ZodEnum.create(["bug", "feature", "refactor"]),
  }),
});

export const updateTaskSchema = object({
  body: object({
    text: string(),
    category: ZodEnum.create(["bug", "feature", "refactor"]),
    status: ZodEnum.create(["backlog", "in_progress", "done"]),
  }).partial(),
});

export const changeTaskCategorySchema = object({
  body: object({
    category: ZodEnum.create(["bug", "feature", "refactor"]),
  }),
});

export const changeTaskStatusSchema = object({
  body: object({
    status: ZodEnum.create(["backlog", "in_progress", "done"]),
  }),
});

export type TaskInput = TypeOf<typeof taskSchema>["body"];
