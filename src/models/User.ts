import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name?: string;
}

const schema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(schema, { timestamps: true });

export default model<User>('Users', userSchema);
