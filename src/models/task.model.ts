import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User } from "./user.model";

enum Category {
  BUG = "bug",
  FEATURE = "feature",
  REFACTOR = "refactor",
}

enum Status {
  BACKLOG = "backlog",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Task {
  @prop({
    ref: () => User,
  })
  user: Ref<User>;

  @prop({ required: true })
  taskDay: Date;

  @prop({ required: true })
  text: string;

  @prop({ required: true })
  category: Category;

  @prop({ required: true })
  status: Status;
}

const taskModel = getModelForClass(Task);
export default taskModel;
