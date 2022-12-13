import { model, Schema } from 'mongoose';
import validator from 'validator';

export interface IUser {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema(
  {
    email: {type: String, required: true, validate: {
      validator(value: string) {
        return validator.isEmail(value);
      },
      message: 'Необходимо ввести email'
      }},
    password: {type: String, required: true, select: false},
    name: {type: String, minlength: 2, maxlength: 30, default: 'Жак-Ив Кусто'},
    about: {type: String, minlength: 2, maxlength: 200, default: 'Исследователь'},
    avatar: {type: String, default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
      validator(value: string) {
        return value.match(`^(https?|http):/`) !== null;
      },
      message: 'Необходимо ввести url'
      }}
  }
)

export default model<IUser>('user', userSchema);