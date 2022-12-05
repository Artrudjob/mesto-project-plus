import { model, Schema } from 'mongoose';

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema(
  {
    name: {type: String, minlength: 2, maxlength: 30, required: true},
    about: {type: String, minlength: 2, maxlength: 200, required: true},
    avatar: {type: String, required: true, validate: {
      validator(value: string) {
        return value.match(`^(https?|http):/`) !== null;
      },
        message: 'Необходимо ввести url'
      }}
  }
)

export default model<IUser>('user', userSchema);