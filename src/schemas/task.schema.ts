import { TypeOf, ZodEnum, object, string } from "zod";

export const taskSchema = object({
  body: object({
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
  }).partial(),
});

export const changeTaskCategorySchema = object({
  body: object({
    category: ZodEnum.create(["bug", "feature", "refactor"]),
  }),
});

export type TaskInput = TypeOf<typeof taskSchema>["body"];