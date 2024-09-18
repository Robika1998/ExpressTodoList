import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  task: string;
  isDone: boolean;
  Date: string;
}

const UserSchema: Schema = new Schema({
  task: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  Date: { type: Date, default: Date.now },
});

const User = mongoose.model<ITask>("Task", UserSchema);

export default User;
