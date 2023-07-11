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
  text: string;

  @prop({ required: true })
  category: Category;
}

const taskModel = getModelForClass(Task);
export default taskModel;
