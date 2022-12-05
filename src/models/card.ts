import { model, Schema, Types } from 'mongoose';

interface ICard {
  name: string
  link: string
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema(
  {
    name: {type: String, minlength: 2, maxlength: 30, required: true},
    link: {type: String, required: true, validate: {
        validator(value: string) {
          return value.match(`^(https?|http):/`) !== null;
        },
        message: 'Необходимо ввести url'
      }},
    owner: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    likes: {type: [Schema.Types.ObjectId], default: []},
    createdAt: {type: Date, default: Date.now()}
  }
)

export default model<ICard>('card', cardSchema)
